---
layout: post
title: "Automating Poll Tweets in the New Layout Hellscape"
date: 2019-07-23
description: 
image: /blog/assets/images/schillbot_header.png
author: Jonny Saunders
tags:
  - twitter
  - webscraping
  - scraping
  - selenium
  - schillbot
---

Yes, the new Twitter layout is so o o bad, but it also broke my bot that uses Selenium to post polls (a weird missing part of the Twitter API).

Here are some new selectors that should be useful.

While I'm at it, I'll explain a few pieces of rest of this slightly-trickier-than-usual bot. (I'm sure I borrowed most of this code from somewhere but I can't remember where :(, sorry knowledge hole.)

[See the full repo](https://github.com/sneakers-the-rat/schillbot)

Your bot will do this:

<video controls>
  <source src="/blog/assets/images/schillbot_vid.mp4" type="video/mp4">
</video>

# Imports

This uses selenium and a few other standards, here's all them parts

<pre><code class="python">
import logging
import os
import random
import time
import traceback
import json

import pandas as pd
import numpy as np

from selenium import webdriver
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
</code></pre>

# Parameter classes

A few classes to hold our parameters. The primary class here is `TwitterLocator`. To manipulate the web zone you need to know what to click on, what to scroll to, heck even what to type in. We use selenium's `By` module and make tuples for each as class attributes. Some of these were pretty heinous to find after the homepage update, so they'll probably change next week and ymmv.

<pre><code class="python">

class URL:
    TWITTER = 'http://twitter.com'

class Constants:
    USERNAME = creds['USER']
    PASSWORD = creds['PASS']
    GLOBAL_ENTRY_Q = '#globalentry'


class TwitterLocator:
    # login stuff
    login_btn        = (By.CLASS_NAME, "StaticLoggedOutHomePage-buttonLogin")
    username         = (By.CLASS_NAME, "js-username-field")
    password         = (By.CLASS_NAME, "js-password-field")

    # tweet stuff
    outer_tweet_box  = (By.CLASS_NAME, 'public-DraftStyleDefault-block')
    tweet_box        = (By.CLASS_NAME, "public-DraftEditor-content")
    tweet_btn        = (By.XPATH, "//*[@data-testid='toolBar']//div[2]//div[3]")

    # poll stuff
    poll_btn         = (By.XPATH, '//div[@aria-label="Add poll"]')
    option_one       = (By.NAME, 'Choice1')
    option_two       = (By.NAME, 'Choice2')

    # etc.
    search_input     = (By.ID, "search-query")
    like_btn         = (By.CLASS_NAME, "HeartAnimation")
    latest_tweets    = (By.PARTIAL_LINK_TEXT, 'Latest')

</code></pre>

# PollBot itself

It starts innocently enough, loading a basic [Chrome webdriver](http://chromedriver.chromium.org/downloads) and loading the homepage. You'll have to add your chromedriver to your path, eg. `export PATH=$PATH:/path/to/chromedriver/folder`. Uncomment the '--headless' line if you don't want it popping up on you.

<pre><code class="python">

class PollBot(object):

    def __init__(self):
        self.locator_dictionary = TwitterLocator.__dict__
        self.chrome_options = Options()
        #self.chrome_options.add_argument("--headless")
        self.browser = webdriver.Chrome(chrome_options=self.chrome_options)
        self.browser.get(URL.TWITTER)
        self.timeout = 2
        
</code></pre>

The guts of the class uses the `TwitterLocator` class to navigate the site by overloading the `__getattr__`. We use a few `WebDriverWait`s to make sure the thing we're looking for is on the page, and then `find_element`

<pre><code class="python">

    def _find_element(self, *loc):
        return self.browser.find_element(*loc)

    def __getattr__(self, what):
        try:
            if what in self.locator_dictionary.keys():
                try:
                    element = WebDriverWait(self.browser, self.timeout).until(
                        EC.presence_of_element_located(self.locator_dictionary[what])
                    )
                except(TimeoutException, StaleElementReferenceException):
                    traceback.print_exc()

                try:
                    element = WebDriverWait(self.browser, self.timeout).until(
                        EC.visibility_of_element_located(self.locator_dictionary[what])
                    )
                except(TimeoutException, StaleElementReferenceException):
                    traceback.print_exc()
                # I could have returned element, however because of lazy loading, I am seeking the element before return
                return self._find_element(*self.locator_dictionary[what])
        except AttributeError:
            super(PollBot, self).__getattribute__("method_missing")(what)
</code></pre>

We'll chain together two methods and I guess quit too.

<pre><code class="python">
    def run(self, post_text):
        self.login()
        self.tweet_poll(post_text)
        self.browser.quit()
</code></pre>

## Login

So when we do things like `.login()` we just chain together a bunch of attribute calls - calling `self.login_btn` calls `self.__getattr__(self, 'login_btn')` - and selenium commands. We get pretty sleepy through all these methods because this bot doesn't care about FAST POSTS and has bad internet.

<pre><code class="python">

    def login(self, username=Constants.USERNAME, password=Constants.PASSWORD):
        self.login_btn.click()
        time.sleep(1)
        self.username.click()
        time.sleep(0.1)
        self.username.send_keys(username)
        time.sleep(0.1)
        self.password.click()
        time.sleep(0.1)
        self.password.send_keys(password)
        time.sleep(0.1)
        self.browser.find_elements_by_css_selector(".clearfix>.submit")[0].click()
        time.sleep(0.5)

</code></pre>

## Tweet poll

Once we're logged in, go ahead and tweet the poll already. More of the same song and dance.

<pre><code class="python">

    def tweet_poll(self, post_text):

        # click the tweet box
        self.outer_tweet_box.click()
        time.sleep(1)

        # type the tweet
        self.tweet_box.send_keys('\"' + post_text.lower() + '\" uohellno.com')
        time.sleep(1)

        # make the poll
        self.poll_btn.click()
        time.sleep(0.1)
        self.option_one.click()
        time.sleep(0.1)
        self.option_one.send_keys('human schill')
        time.sleep(0.1)
        self.option_two.click()
        time.sleep(0.1)
        self.option_two.send_keys('robot schill')
        time.sleep(0.2)

        # send the tweet
        self.tweet_btn.click()
        time.sleep(2)

</code></pre>

# fin

And there you have it. The rest of the code in the repo is just badly made code to randomly choose a tweet from some [neural net that mocks the President of the University of Oregon](https://twitter.com/schillbot3000). 







