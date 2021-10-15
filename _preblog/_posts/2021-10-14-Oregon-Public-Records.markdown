---
layout: post
title: "Public Records in Oregon"
date: 2021-10-14
description: How to get what the state dont want you to have!
author: Jonny Saunders
image: /blog/assets/images/oregonian_foia.png
toc: 
  - max_level: 1
tags:
  - public records
  - webscraping
---



Writing down a bit of what I've learned about getting public records for a skillshare. This'll focus mostly on Oregon, but most states have similar public records laws modeled off FOIA :). A lot of this comes from the [CLDC's](https://cldc.org/) public records and FOIA workshops, plus a lil sleuthing of my own. Note that I am **not a lawyer** and **none of this information should be considered legal advice or even definitive.**

# Public Records & FOIA

Public records are the state version of FOIA, which allow anyone to request information about the operation of public entities. Public records laws are modeled after FOIA, although each state has subtle statutory and judicial differences. 

In Oregon, public records are governed by [ORS 192](https://oregon.public.law/statutes/ors_chapter_192), which defines a "Public Record" broadly as:

> [ORS 192.311(5)(a)](https://oregon.public.law/statutes/ors_192.311): “Public record” includes any writing that contains information relating to the conduct of the public’s business, including but not limited to court records, mortgages, and deed records, prepared, owned, used or retained by a public body regardless of physical form or characteristics.
>
> [ORS 192.311(5)(b)](https://oregon.public.law/statutes/ors_192.311): “Public record” does not include any writing that does not relate to the conduct of the public’s business and that is contained on a privately owned computer.

"Writing" is similarly broadly defined: 

> [ORS 192.311(7)](https://oregon.public.law/statutes/ors_192.311): "Writing” means handwriting, typewriting, printing, photographing and every means of recording, including letters, words, pictures, sounds, or symbols, or combination thereof, and all papers, maps, files, facsimiles or electronic recordings. 

So the law is constructed to start from assuming effectively *all* records should be able to be requested, and then carving out specific exemptions for those that aren't (rather than listing specific records that *are* covered).

You can do it too! Anyone can file a request, and so you can find your way to getting fun documents like:

![The President of UOregon, Mike Schill, expresses his undying love for Phil Knight](/blog/assets/images/phil_schill.png)

## History of FOIA

FOIA is codified in [5 USC § 552](https://www.law.cornell.edu/uscode/text/5/552), and it requires federal agencies of the executive branch to disclose their records. 

FOIA was proposed in 1955 by John Moss, who was elected in 1953 by a thin margin after accusations that he was a [communist or communist sympathizer](https://unredacted.com/2018/04/17/john-moss-and-the-roots-of-the-freedom-of-information-act-worldwide-implications/). In 1947, Truman had signed [Executive Order 9835](https://en.wikipedia.org/wiki/Executive_Order_9835) which established the "Loyalty Program" to investigate communist activity in the government:

> Based on the results of these investigations, the targets could be fired from their government jobs, prosecuted, and made virtually unemployable. They faced public condemnation and personal humiliation in the process. People investigated under the Loyalty Program were not allowed to confront their accusers or see the charges against them, often based on hearsay evidence that was held in secret files compiled by the Federal Bureau of Investigation. ([unredacted](https://unredacted.com/2018/04/17/john-moss-and-the-roots-of-the-freedom-of-information-act-worldwide-implications/))

After much pushback (and support from oddly enough Donald Rumsfeld and eventually even Joseph McCarthy others) a bill similar to Moss's initial proposal was passed in 1965. The bill went to LBJ's desk where it languished for awhile, just up until the July 4th deadline:

![Letter from the Oregonian urging LBJ to pass FOIA ](/blog/assets/images/oregonian_foia.png)

But after a veto threat, LBJ signed it, his press secretary Bill Moyers [later](http://www.pbs.org/now/commentary/moyers4.html) said:

> LBJ had to be dragged kicking and screaming to the signing ceremony. [Johnson] hated . . . of journalists rummaging in government closets; hated them challenging the official view of reality. He dug in his heels and even threatened to pocket veto the bill after it reached the White House. Only the courage and political skill of a Congressman named John Moss got the bill passed at all, and that was after a twelve-year battle against his elders in Congress who blinked every time the sun shined in the dark corridors of power. They managed to cripple the bill Moss had drafted. And even then, only some lastminute calls to LBJ from a handful of newspaper editors overcame the President’s reluctance; he signed . . . [the f—ing thing] as he called it . . . and then went out to claim credit for it. So the Freedom of Information Act became law. 

In his signing statement, LBJ described the purpose of the bill (taking credit for it):

![LBJ FOIA statement, important part being "I have always believed that freedom of information is so vital that only the national security, not the desire of public officials or private citizens, should determine when it is restricted ... I am instructing every official in this Administration to cooperate to this end and to make information available to the full extent consistent with individual privacy and with the national interest"](/blog/assets/images/lbj_foia_statement.png)

Since then federal courts have both chipped away at and reinforced the strength of the bill, but its purpose, to ensure records that allow the public to understand the operation of their government, animates the process:

> It has often been observed that the central purpose of the FOIA is to "open up the workings of government to public scrutiny." One of the premises of that objective is the belief that "an informed electorate is vital to the proper operation of a democracy." **A more specific goal implicit in the foregoing principles is to give citizens access to the information on the basis of which government agencies make their decisions, thereby equipping the populace to evaluate and criticize those decisions.** Each of these objectives — and particularly the last — would be best promoted by a rule that all records in an agency's possession, whether created by the agency itself or by other bodies covered by the Act, constitute "agency records." 
>
> [McGehee v CIA 697 F.2d 1095 (D.C. Cir. 1983)](https://casetext.com/case/mcgehee-v-cia)

# Exemptions

There are 7 broad categories of Exemptions in FOIA, and Oregon extends them with a relatively large number of additional categories.

## FOIA Exemptions

FOIA exemptions are illustrative of the kinds of records that are also typically exempt in Public Records, though again they are different! 

1. **National Security** - documents that are confidential, secret, or top secret. Originally made in [Executive Order 12958](https://www.justice.gov/oip/blog/foia-update-executive-order-12958-classified-national-security-information) and later updated with [EO 13526](https://www.archives.gov/isoo/policy-documents/cnsi-eo.html) that added additional limits on what kinds of documents could be classified.
2. **Internal Personnel Rules** - HR rules and practices, etc. But can get around by arguing it's in the public interest to know
3. **The Exemption Exemption** - if stuff is specifically exempt by other laws, then it's exempt
4. **Trade Secrets** - Information that could harm a businessssss like proprietary information. 
5. **Deliberative Process** - internal communications within/between agencies that lead to decisions. Stuff like memos. More protective of personal opinions than official agency positions and communication.
6. **Personnel and Medical Files** - you can't request someone's social security number and stuff
7. **Law Enforcement** - Records compiled for law enforcement purposes that
    1. would interfere with enforcement proceedings
    2. would deprive someone of right to fair trial
    3. disclose identities of confidential sources
    4. disclose techniques and procedures for law enforcement investigations
    5. endanger life or physical safety
8. **Documents for Financial Institutions** - rare
9. **Geological and GIS Data** - like maps, rare.


All these exemptions are weighed against the public interest, though some (like national security) are effectively blanket exemptions.


## Public Records Exemptions

Oregon makes a list of its exemptions available here: [https://justice.oregon.gov/PublicRecordsExemptions/](https://justice.oregon.gov/PublicRecordsExemptions/)

There are two categories of exemptions in Oregon, "Conditional" exemptions that depend on "whether the public interest requires disclosure in the particular instance," codified in [ORS 192.345](https://oregon.public.law/statutes/ors_192.345), and "unconditional" exemptions that are always exempt, codified in [ORS 192.355](https://casetext.com/statute/oregon-revised-statutes/title-19-miscellaneous-matters-related-to-government-and-public-affairs/chapter-192-records-public-reports-and-meetings/records-and-reports-in-english/section-192355-public-records-exempt-from-disclosure)

There are way too many to list, so just go to those pages and search around!



# Making a Request

So it's time to actually do one of these, eh?

## Finding The Records

First, you have to know what you want. The most effective requests are for specific, named or numbered documents, but you can describe anything you want and there are standards for how interpretable your request can be. More information about that will come next.

1. **See if it's already been released** - check [MuckRock](https://www.muckrock.com/) and the other information sources listed in the [Oregon Records Sources](#oregon-records-sources)
2. **Check Records Retention Schedules** - Go shopping! The Oregon Secretary of State maintains [a list](https://secure.sos.state.or.us/oard/displayChapterRules.action?selectedChapter=175) of documents and information that various agencies are required to keep and for how long. The agencies are legally required to have this information ready to go, so they can't give you a [Glomar](https://en.wikipedia.org/wiki/Glomar_response) or pretend like they don't have them, and the case for a low fee is easier to make. For example
    - [OAR 166-150-0135](https://secure.sos.state.or.us/oard/viewSingleRule.action?ruleVrsnRsn=26067) - Law Enforcement
    - [OAR 166-150-0145](https://secure.sos.state.or.us/oard/viewSingleRule.action?ruleVrsnRsn=26071) - 9-1-1
    - [OAR 166-475-0005](https://secure.sos.state.or.us/oard/displayDivisionRules.action?selectedDivision=613) - Oregon University System
    - [OAR 166-150-0165](https://secure.sos.state.or.us/oard/viewSingleRule.action?ruleVrsnRsn=26075) - County Planning
3. Look for writing or public communication that references some particular piece of information. Eg. if a public official mentions that "according to our internal research..." then you have grounds to request the research!
4. Just describe it! Don't be shy! shoot off a quick public records request that just says "hello i would like to have the contract between x and y" or "would like to have x person's emails from y to z date!"

## Writing the Request

Your request will have a few components, you want to tailor it to sail through the process (described below) so you need to be reasonably strategic (described further below).

What do you want? You have to strike a balance between generality (so you get *everything* you want) and specificity (so they don't ask *infinity dollars* for it). The guidelines for what constitutes a "reasonable description" of public records are pretty vague, but some guardrails have been given by the courts. Again, FOIA and public records laws are supposed to be written to favor document release, and the courts seem pretty fine with the argument "cmon, you know what they're talking about":

> "agency is able to determine precisely what records are being requested"
>
> [(Yeager v. Drug Enforcement Admin 678 F2d 315, 326 (Dc Cir 1982))](https://casetext.com/case/yeager-v-drug-enforcement-administration)

> A request must "be sufficient . . . to enable a professional employee of the agency who was familiar with the subject area of the request to locate the record with a reasonable amount of effort."
>
> [H.R. Rept. No. 93-876, 93d Cong. 2d Sess. (1974) at 6.](https://nsarchive2.gwu.edu/nsa/foialeghistory/H.R.%20Rep.%20No.%2093-876%20(Mar.%205,%201974).pdf)

The language here can be tricky, so you want to be as specific as you can be. For example if you are asking for all emails between two people in which they are talking about a specific event, you should use a word like "mention," and ideally give them a list of words, rather than "refer," "relate to," or "concern" because there isn't a bright line around what it means to be "related to" a particular object. Think about how the records custodian is going to search for the records, and try and mirror that. eg. "I would like to request all emails from `<person>` that contain any of the following words: `<word 1>`, `<word 2>`, ..."

To constrain your search, particularly for emails or other documents that are produced continuously, specify a date range. If you aren't sure about what dates exactly would be relevant, try requesting a narrow range near the end of the period you're concerned with and ask for all previous messages in the email chain to also be included. 

Constrain your search, but also make sure you request all parts of what you are interested in, for example contracts often have supplementary documents or appendices, so you should make sure to request "and all referenced documents" or something similar. When requesting emails, request attachments and replies. The public records officer will probably want to give you as little as they can while still being responsive to the request.

You can request that the documents be returned in a specific format, 

Make sure you request a fee waiver (described further in [strategy tips](#strategy-tips)), or else make your request with a journalist or something like Muckrock which will make it more likely to have your waiver approved. 

Identify the responsive agency --- sometimes that might be clear, but otherwise every agency will have to list some records custodian that you usually can find with a quick google. For example, public records requests for the University of Oregon to go `pubrec@uoregon.edu`. Refer to public records retention schedules which will list what agencies will have which information if in doubt. 

Send it off! Email is good, if you need to submit by mail, consider certified, though certified mail can be rejected which is bad.

An example can be as simple as


> Hello,
>
> I would like to request any contracts the University of Oregon or any of its subsidiary organizations have entered into that agree to provide rooms in UO residence halls during the international track and field championship. The Register Guard has [previously reported](https://www.registerguard.com/news/20191215/housing-owner-withdraws-2021-beds-over-oregon-rent-control-emails-show) that UO agreed to provide "4,145 [beds] from new and rennovated dorm rooms" as part of its bid.
>
> I would like to request a complete fee waiver, as information about the financial arrangements worth hundreds of millions of dollars between public universities and outside agencies is eminently in the public interest.
>
> xoxo


## Request Process

Once you submit your request...

1. The records custodian will **acknowledge** your request, and will give you a determination whether or not they can fill your request and how much it costs. If you're lucky, you will just get the records right off! In Oregon, the custodian must acknowledge receipt of your request within **5 business days**.
2. After acknowledgement FOIA requests have a **20 day** window to **respond** to your request, and every response "tolls" that 20 day period. In Oregon, they have *no more than* **15 business days** after receiving the request to complete it. They additionally are supposed to complete requests "as soon as possible and without unreasonable delay," so theoretically you are allowed to skip straight to an appeal if they drag out a really straightforward request, but I have never had luck with getting records faster this way. 
3. If they respond with a fee estimate, the deadline is *suspended* until the fee has been paid or waived. Denial of a fee waiver, since you should generally get them unless the records don't have a compelling public interest, is typically a shortcut to litigation --- "sue us we dare you."
4. If they **miss the deadline or refuse your fee waiver,** file an [administrative appeal](https://www.doj.state.or.us/oregon-department-of-justice/public-records/appeal-a-state-agency-public-records-denial/) to the Attorney General. The form is [here](https://www.doj.state.or.us/oregon-department-of-justice/public-records/petition-for-public-records-order/). CLDC says "do them they work," if you file an appeal you will likely have it approved. 

    Other reasons to appeal include:

    - inadequate search for records
    - improper withholding (they aren't supposed to withhold a document if even one line is pertinent to the search)
    - improper redaction

5. If your document comes back **heavily redacted,** request that the redactions are itemized, citing the specific exemptions that justify them. That gives you a better sense of how to appeal and also might give you some information about what they are.
6. If you get a **"Glomar Response"** that refuses to confirm or deny the existence of responsive documents (as opposed to an affirmation that they do not have the documents), see if the records have been acknowledged officially elsewhere in any speeches or documents. Leaks don't always count as official acknowledgement. If documents are known to be publicly available (eg. if a newspaper has written that it has received them) they can't be withheld.
7. If your **administrative appeal** fails, then you have to litigate! I have never been here before, but you need to have *standing,* which means demonstrating some injury, file a lawsuit in the appropriate juristiction/venue (where the requestor lives, where the records are, or Washington DC for some federal agencies), and ask for a specific remedy --- or what you want the court to do. You can ask for a [preliminary injunction](https://foia.wiki/wiki/Preliminary_Injunctions) to expedite your request if you are likely to prevail in winning the appeal, whether you will be irreparably harmed without the injunction (eg. if you need some records before a certain date), and whether the public will benefit from the injunction. A Permanent injunction asks for the records themselves to be turned over immediately.

## Strategy Tips

1. Always request a fee waiver - you should get a partial or full fee waiver if doing so "is in the public interest because making the record available primarily benefits the general public." This is weighed against your ability to distribute the records/likelihood that you will, so working with a journalist or Muckrock is a good idea here. Otherwise you can just say "i plan to publish these records and write about them in the paper" or something like that.
2. If an agency fails to abide by the timelines set out by FOIA or public records laws, *the agency may have waived its right to collect fees from you* and you can specify that in the administrative appeal.
3. Make your request cheap - the primary determinant of cost (aside from caprice) is the labor time it would take to prepare the request. Doing requests that can be done with a computer, don't need manual curation like reading a bunch of documents to see what is relevant, or don't need a bunch of redactions will all be cheaper. 
4. Do it iteratively! get summaries first and then expand later. Spiderweb through documents, rather than getting held up by a $500 request, narrow it and use the first request to target subsequent requests.
5. If you're requesting something that will need heavy redaction (eg. be expensive), request some summary of the documents first that wouldn't so you know where to target further. Eg. request a summary of the number of emails sent between a set of email addresses in a certain date range, request only the subject lines, and so on. This is especially useful for police records because those always come back maximally redacted. Getting a summary also gives you a point of reference for future requests: if they say there were 87 use of force incidents, there better be 87 when you request them.
6. If you need to salami-slice a request, do it iteratively or from different email addresses spaced out over time. In my experience records custodians hate getting 50 records requests for the same thing in an attempt to get them cheaper. 
7. You don't need to identify yourself to make a public records request! Since anyone can do it, there's no need to verify anything, so go ahead and use an anonymous email address -- though you are less likely to get a fee waiver this way since there's no way they can estimate how likely you are to disseminate the records.

# Resources

## General

* [CLDC FOIA Workshop Handout](/blog/assets/hosted/FOIA-Workshop-Handouts.pdf)
* [Guide to Oregon Public Records](/blog/assets/hosted/OregonPublicRecordLaw.pdf)
* [Oregon Attorney General Public Records Manual](https://www.doj.state.or.us/oregon-department-of-justice/public-records/attorney-generals-public-records-and-meetings-manual/)
* [Oregon Records Exemptions](https://justice.oregon.gov/PublicRecordsExemptions/)
* [Oregon Records Retention Schedules](https://secure.sos.state.or.us/oard/displayChapterRules.action?selectedChapter=175)
* [Muckrock](https://www.muckrock.com/) - search for records, file a request, submit what ya get!
* [FOIA Project](http://foiaproject.org/)
* [National Security Archive](https://nsarchive.gwu.edu/)
* [FOIA.wiki](https://foia.wiki/wiki/Main_Page)
* Not really public records or FOIA, but a lot of government data is on [data.gov](https://www.data.gov/)
* [Nonprofit 990 Forms](https://projects.propublica.org/nonprofits/) - eg. the [UO Foundation](https://projects.propublica.org/nonprofits/organizations/936015767)

## Oregon & UO Records Sources

Skip the request! Lots of public information is already available! Many of these are specific to my area, but they give you an idea of what kind of records repositories are out there


* Oregon Secretary of State records [(ORMS)](http://records.sos.state.or.us/ORSOSWebDrawer/Search) - lots of meeting minutes, legislative text, etc.
* Oregon [Business Records](https://sos.oregon.gov/business/pages/find.aspx)
* Oregon [Charities/Nonprofits](https://justice.oregon.gov/charities)
* Oregon DPSST training records [(IRIS)](https://www.bpl-orsnapshot.net/PublicInquiry_CJ/EmployeeSearch.aspx)
* IRS [Nonprofit Search](https://www.irs.gov/charities-non-profits/tax-exempt-organization-search)
* Lane County [Property information search](https://lanecounty.hosted.civiclive.com/cms/One.aspx?portalId=3585881&pageId=5145461)
* Lane County [regional land information database](https://www.rlid.org/index.cfm)
* Lane County [Survey maps (SIDO)](https://lcmaps.lanecounty.org/LaneCountyMaps/SIDOMapsApp/index.html)
* Lane County [Lane records and building permits](http://apps.lanecounty.org/LMDPro/)
* Eugene [Permits](https://pdd.eugene-or.gov/buildingpermits/permitsearch)
* Eugene [Fire and EMS CAD Calls](https://coeapps.eugene-or.gov/ruralfirecad)
* EPD [Dispatch Log](https://coeapps.eugene-or.gov/epddispatchlog)
* [uomatters](https://uomatters.com) - Bill Harbaugh's huge stash of history and records of UO malfeasance.
* [UO Salary Records](https://ir.uoregon.edu/salary), .csv versions here: [https://github.com/sneakers-the-rat/uoregon_salary_data](https://github.com/sneakers-the-rat/uoregon_salary_data)
* [UO Internal Research](https://ir.uoregon.edu/)
* [UO Budgets](https://brp.uoregon.edu/content/Budget-Reports)
* [UO Mailing Lists Archive](https://lists.uoregon.edu/mailman/listinfo) - (try searching `site:https://lists.uoregon.edu/mailman/listinfo` ) 


and bonus

* [a selection of records i've gathered](https://jon-e.net/projects/records)