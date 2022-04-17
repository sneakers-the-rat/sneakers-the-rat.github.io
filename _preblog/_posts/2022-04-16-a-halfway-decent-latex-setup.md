---
layout: post
title: "A Halfway Decent LaTeX Writing Setup"
date: 2022-04-16
description: For when you love pain enough to use LaTeX but still want to get anything done
author: Jonny Saunders
tags:
  - LaTeX
  - Writing
  - Sublime Text
  - Tectonic
  - Guides
toc: 
  - max_level: 1
---

I wouldn't necessarily *recommend* writing anything in LaTeX unless you're already in the cult, but if you are, this is how I've managed to write in a way that doesn't make me curse us having taught electrified rocks about letters in the first place.

In short, we'll be able to

* One-click add a citation to our document and download a pdf using Zotero
* Edit nicely with LaTeXTools and Sublime Text
* Compile our document on save with Tectonic
* Sync back and forth from the pdf and the source!

# Prereqs

We'll need some software!

I'm using a mac, but most key combinations in windows just swap `cmd` for `ctrl`.

* [Zotero](https://www.zotero.org/) - Reference and PDF management - [download](https://www.zotero.org/download/) 
  * We'll also need the [zotfile](http://zotfile.com/) and [Better BibTeX](https://retorque.re/zotero-better-bibtex/) plugins, as well as the relevant zotero browser extension.
* [Sublime Text](https://www.sublimetext.com/) - Text editor! - [download](https://www.sublimetext.com/download) or with homebrew: `brew install --cask sublime-text`
  * Within sublime text we'll be using some plugins, so install the plugin manager [Package Control](https://packagecontrol.io/installation). From within sublime, open the command palette `cmd+shift+p`, type `Install Package Control` (an autocomplete menu should get you to the right place before you finish typing the full thing) then press `enter`
  * Install [https://packagecontrol.io/packages/LaTeXTools](LaTeXTools) - open command palette again, type `Package Control: Install Package`, type `LaTeXTools`, then `enter`
  * Repeat the above to also install [`LaTeX-cwl`](https://packagecontrol.io/packages/LaTeX-cwl) for code completions! and [`Hooks`](https://packagecontrol.io/packages/Hooks) for building on saving
* [Skim](https://skim-app.sourceforge.io/) - PDF Viewer that supports forward and back syncing with the document (windows users try SumatraPDF). 
* [Tectonic](https://tectonic-typesetting.github.io/en-US/) - LaTeX Builder - [installation instructions](https://tectonic-typesetting.github.io/book/latest/installation/index.html), or with homebrew: `brew install tectonic`

# Document Structure

## New Tectonic Project

Let's make a document!

Tectonic uses its own directory structure and a `Tectonic.toml` file to configure its builds. To create it, use `tectonic -X new <document name>`. For the sake of this example we'll call ours `my_document`. After doing so, you should have a folder that looks like this:

```
my_document/
├── Tectonic.toml
└── src
    ├── _postamble.tex
    ├── _preamble.tex
    └── index.tex
```

By default, the `Tectonic.toml` file will look like this:

```toml
[doc]
name = 'my_document'
bundle = 'https://data1.fullyjustified.net/tlextras-2020.0r0.tar'

[[output]]
name = 'default'
type = 'pdf'
```

First we'll change our output document name, also calling it `my_document` rather than `default`. You can also change the name of each of the document subsections, `_preamble.tex`, `index.tex`, and `_postamble.tex` by setting them explicitly here. For example:

```toml
[doc]
name = 'my_document'
bundle = 'https://data1.fullyjustified.net/tlextras-2020.0r0.tar'

[[output]]
name = 'my_document'
index = 'my_document.tex'
type = 'pdf'
``` 

Then if we build the document with `tectonic -X build` then we'll get something like this:

```text
my_document/
├── Tectonic.toml
├── build
│   └── my_document
│       └── my_document.pdf
└── src
    ├── _postamble.tex
    ├── _preamble.tex
    └── my_document.tex

```

## Subsections

Tectonic helps us out by splitting out the preamble and postamble of LaTeX documents, but the `index` file then contains the whole ass document which can get huge and unmanageable. Instead we can split our document into subsections and use the `\input` command to combine them.

Let's make the basic structure for our intro, results, and conclusion. We'll also probably want to include some figures, so we can also make a directory for that too!

```text
../my_document/
├── Tectonic.toml
├── build
│   └── my_document
│       ├── my_document.log
│       └── my_document.pdf
└── src
    ├── _postamble.tex
    ├── _preamble.tex
    ├── figures
    │   ├── figure_1.png
    │   └── figure_2.png
    ├── my_document.tex
    └── sections
        ├── conclusion.tex
        ├── intro.tex
        └── results.tex
```

Since `\input` effectively copies and pastes the text directly, you can include your figures with `\includegraphics{figures/figure_1.png}` without needing to jump up and out of relative directories. You can also make additional layers of nesting for very long documents, prepend numbers to the filenames to keep them in order, etc. Whatever works for you!

While we're editing, to speed up navigation around multiple files, we can take advantage of Sublime Text's [goto](https://docs.sublimetext.io/guide/usage/file-management/navigation.html#goto-anything) features -- `cmd+p` and then start typing a filename, and there are more syntax commands to jump to specific places in the document (see linked docs). 

# References & PDFs with Zotero

Let's make our lit review easier and one-click add a reference and download a PDF with zotero.

First we can make a new collection or subcollection for references within zotero, click the yellow folder icon in the top left of the window, or else right click in the library pane and click "New subcollection" within an existing collection.

## Grab PDFs from Sci-Hub

Then we configure zotero to use Sci-Hub to automatically grab PDFs for papers if they can't be found using its usual methods. Open the config editor: Zotero > Preferences... > Advanced > Config Editor. Search for the `extensions.zotero.findPDFs.resolvers` configuration option, double click copy the following JSON configuration, and click OK:

```json
{     
  "name":"Sci-Hub",     
  "method":"GET",     
  "url":"https://sci-hub.se/{doi}",     
  "mode":"html",     
  "selector":"#pdf",     
  "attribute":"src",     
  "automatic":true 
}
```

If we have configured Zotfile (see documentation on the [zotfile site](http://zotfile.com/)) to automatically grab new downloads, rename them, and add them to the citation, then when you click the zotero icon in your browser you should automatically get a PDF in a nice and tidy place!

## Better BibTex - Autoupdate bibliographies

Now let's get our reference in our document! 

* Right click on the collection from within Zotero,
* Click "Export Collection..." 
* Select "Better BibLaTeX"
* Check "Keep updated"
* and then export it to the `src` directory of our document.

Within the `_preamble.tex`  we prepare our citation style, as well as do some other nice things like enabling backlinks from our references to the sections where they're used.

```latex
\documentclass{article}
\usepackage[usenames, svgnames]{xcolor}
\usepackage[
  colorlinks = true,
    hyperfootnotes=true,
    urlcolor = DarkOrchid,
    citecolor = DarkOrchid,
    backref = section
]{hyperref}
\usepackage{natbib}
\bibliographystyle{plainnat}

\title{My Document}
\begin{document}
```

And then our `my_document.tex` again:

```latex
\input{sections/intro}

\input{sections/results}

\input{sections/conclusion}

\bibliography{my_document}
```

Since Better BibLaTeX will auto-update our .bib file, Now we can get a reference, automatically get a PDF, automatically update our bibliography file for our paper, and then immediately cite something!


# Editing with Sublime Text & LaTeXTools

When you're working with sublime text, it's useful to open the whole folder rather than individual files. You can also use a `sublime-project` file, which allegedly lets you set project-wide settings with LaTeXTools, but I've never gotten that to work. To do that you either use the File > Open... command and open the folder, or else use from the cli `subl ./my_document`. This way, if you open the sidebar (default `cmd+shift+a`), you can see the whole document structure and group together files from a project within individual windows.

## LaTeXTools Setup

LaTeXTools is a lovely, unwieldy, and I think no longer maintained package, so we need to use it with care. Out of the box it will give you some useful completions and shortcuts, but we need to do a few things to make it work the way we want it.

By default it should be configured to do forward and backwards sync with skim, but you need to do some additional setup for Skim to do the reverse seeking, follow the instructions in the [LaTeXTools Installation docs](https://latextools.readthedocs.io/en/latest/install/#installation).

### Headers

At the start of each of our subsections, we'll need to an indication to LaTeXTools that it should consider the top-level `.tex` file as the document root -- this lets it find the bibliography file for autocompletion, among other things. 

```latex
%!TEX root = ../my_document.tex
```

We also need to tell it that the resulting PDF of our tectonic build will be in a different place than the source directory. This only needs to happen once, in the main `my_document.tex` file

```latex
%!TEX jobname = my_document
%!TEX output_directory = ../build/my_document
```

### Script Build on Save

To tell latextools that we want to build with Tectonic, we have to configure it to use a `script builder` rather than its usual combination of pdflatex et al. 

To edit the LaTeXTools settings, from sublime text go to Sublime Text > Preferences... > Package Settings > LaTeXTools > Settings - User. Change these configuration options (varying depending on your operating system:

```json
{
  "builder": "script",
  "builder_settings" : {

    // General settings:
    // See README or third-party documentation

    // (built-ins): true shows the log of each command in the output panel
    "display_log" : false,
    "program": "xelatex",

    // Platform-specific settings:
    "osx" : {
      "script_commands": ["echo $file; tectonic -X build --keep-logs"]
    },

    "windows" : {
      // See README or third-party documentation
    },

    "linux" : {
      // See README or third-party documentation
    },
  },
}

```

We have do `echo $file;` before running tectonic because annoyingly if `$file` isn't present in the script command, LaTeXTools just sticks it on the end of the command automatically. 

Then to automatically build the document every time we save, open the LaTeX-specific preferences at Sublime Text > Preferences > Settings - Syntax Specific (because we only want to do this for .tex files) and add:

```json
{
  "on_post_save_async_language": [
    {
        "command": "build",
        "scope": "window"
    }
  ]
}
```

See the [Hooks](https://packagecontrol.io/packages/Hooks) docs for more information on the syntax.

## SyncTeX

Synctex lets you jump back and forth from your source code to your document, taking you to the position in the rendered document where your cursor is in the source, or taking you to the point in the source where you clicked. 

To enable generating SyncTeX hooks for your document, put `\synctex=1` in your preamble, so:

```latex
\documentclass{article}
\usepackage[usenames, svgnames]{xcolor}
\usepackage[
  colorlinks = true,
    hyperfootnotes=true,
    urlcolor = DarkOrchid,
    citecolor = DarkOrchid,
    backref = section
]{hyperref}
\usepackage{natbib}
\bibliographystyle{plainnat}

\synctex=1

\title{My Document}
\begin{document}
```

You'll then see a `my_document.synctex.gz` file on next build.

This should work out of the box with LaTeXTools, but there's an obnoxious [indentation bug](https://github.com/SublimeText/LaTeXTools/issues/1539) with an [unmerged pull request](https://github.com/SublimeText/LaTeXTools/pull/1540) that we have to patch ourselves. 

Installed packages, on mac, are located at `/Users/<username>/Library/Application Support/Sublime Text 3/Packages`, or you can get there by opening up the preferences for any package and then using File > Open which should dump you in the location of the preferences file (where the packages are). 

Within `LaTeXTools`, edit lines 101 and 103 to have correct indentation according to [the PR](https://github.com/SublimeText/LaTeXTools/pull/1540/files)

```python
    file_name = view.file_name()
    if not is_tex_file(file_name):
      if from_keybinding:
```

* To jump **source > document**: `cmd+l,j` (that's do `cmd+l` to issue a `l`atextools command, and then afterwards press `j` for jump).
* To jump **document > source** (with Skim): `cmd+Shift+click` on the text you want to jump to the source of.

# A few "Nice To Haves"

## Hashed Document Version

I version control my documents so that I don't self-destruct, and like to use git tags to label different epochs of the draft. You can use git hooks to automatically dump the version of the document into a .tex file and then include it in your document.

For example, in the `.git/hooks/post-commit` file, put:

```bash
#!/bin/sh
git describe > proposal/src/git-version.tex
```

Then from your document, using the titling package:

```latex
\usepackage{titling}

\postdate{ - Version: \texttt{ \input{ git-version.tex} } }
```

Which yields something like this:

![A block of text with a red line and the word "TODO" to the left of it](/blog/assets/images/document_version.png)

## TODO environment

When I'm drafting, I like to leave notes to myself in-place, but to differentiate them from finished text I've made a few different environments to make different kind of notes stand out. One of them is a `todo` environment, which adds a red bar along the left of the text like this:

![A block of text with a red line and the word "TODO" to the left of it](/blog/assets/images/todo_environment.png)

Add this to your `_preamble.tex` (but really put it in its own file where you keep custom environments and then load it in your preamble)

```latex
\usepackage{framed}
\usepackage{rotating}

% todo leftbar
\newenvironment{todo}{ %
\def\FrameCommand{\hspace{-2em}%
\begin{sideways}%
\textcolor{red}{\textsf{\small TODO}}%
\end{sideways}%
\hspace{0.5em}\textcolor{red}{\vrule width 0.5pt} \hspace{0.5em}}\MakeFramed {\advance\hsize-\width \FrameRestore}}
{\endMakeFramed}
```

Then you use it like

```latex
\begin{todo}
Hello i have this to do
\end{todo}

```

## LaTeXTools shortcuts

LaTeXTools has a few useful [keybindings](https://latextools.readthedocs.io/en/latest/keybindings/) that really help if you get used to them. One shortcut I like is `cmd+l, e` to create an environment from the current text, eg

```text
enumerate
```

becomes

```latex
\begin{enumerate}

\end{enumerate}
```






