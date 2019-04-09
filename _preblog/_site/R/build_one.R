local({
  baseurl = "/blog/"
  knitr::knit_hooks$set(toggle = function(before, options, envir) {
      if(options$toggle){
        if(before) {
          return("<details><summary style=\"background-color: #272822; color: #f8f8f2;\">Expand/Collapse Code</summary>")
        } else {
          return("</details>")
        }
      }
    })
  knitr::opts_knit$set(base.url = baseurl)
  knitr::render_jekyll()  # set output hooks

  # input/output filenames as two arguments to Rscript
  a = commandArgs(TRUE)
  d = basename(a[1])
  d = gsub("^_|[.][a-zA-Z]+$", "", d)
  message(d)
  knitr::opts_chunk$set(
    fig.path   = sprintf("assets/images/%s/", d),
    cache.path = sprintf("assets/cache/%s/", d)
  )
  knitr::knit(
    a[1], a[2], quiet = TRUE, encoding = "UTF-8",
    envir = globalenv()
  )
})
