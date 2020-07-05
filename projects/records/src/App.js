import React from "react";
import CheckboxTree from "react-checkbox-tree";
import logo from "./logo.svg";
import "./App.css";
// import Split from "react-split";

// material ui grid
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import Viewer, { Worker } from "@phuocng/react-pdf-viewer";

import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";

import JSZip from "jszip";
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';

import nodes from "./tree.json";

/**
 * Fetch the content and return the associated promise.
 * @param {String} url the url of the content to fetch.
 * @return {Promise} the promise containing the data.
 */
function urlToPromise(url) {
    // console.log(url);
    return new Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if(err) {
                console.log(err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// var nodes = {};



var Promise = window.Promise;
if (!Promise) {
    Promise = JSZip.external.Promise;
}

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  card: {
    flexGrow: 3,
    height: "calc(100% - 100px)",
    overflow: "scroll"
  },
  // cardContent: {
  //   height: "80%"
  // },
  header: {
    flexGrow: 0
  }
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // },
});

const inputStyles = theme => ({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
});


class Files extends React.Component {
    state = {
        checked: [],
        expanded: [],
        clicked: {},
    };

    constructor(props) {
        super(props);

        this.onCheck = this.onCheck.bind(this);
        this.onExpand = this.onExpand.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onCheck(checked) {
        // console.log('on check child');
        // console.log(checked);
        this.setState({ checked });
        this.props.checkedReporter(checked);
    }

    onExpand(expanded) {
        this.setState({ expanded });
        this.props.expandedReporter(expanded);
    }

    onClick(clicked) {
        this.setState({ clicked });
        this.props.fileReporter(clicked.value);
    }

    render() {
        const { checked, expanded, click } = this.state;
        // console.log('child render checked');
        // console.log(this.props.parentChecked);

        return (
            <div className="Files-container">
                <CheckboxTree
                    className="Files"
                    checked={this.props.parentChecked}
                    expanded={this.props.parentExpanded}
                    iconsClass="fa5"
                    nodes={this.props.nodes}
                    onCheck={this.onCheck}
                    onExpand={this.onExpand}
                    onClick={this.onClick}
                    style={{overflow: "scroll"}}
                />
            </div>
        );
    }
}

class PDFViewer extends React.Component {
    static defaultProps = {
        file: "",
    };

    render() {
        if (!this.props.file.endsWith(".pdf")) {
            return <div className="pdf-viewer"></div>;
        } else {
            return (
                <div className="pdf-viewer">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                        <Viewer fileUrl={"/projects/records/"+this.props.file} />
                    </Worker>
                </div>
            );
        }
    }
}

class Downloader extends React.Component {

    state = {
        checked: [],
        currentFile: 0,
        downloading: false,
        progress: 0
    }

    constructor(props){
        super(props);
        this.setChecked = this.setChecked.bind(this);
        this.downloadFiles = this.downloadFiles.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
    }


    downloadFiles(){
        var checked = this.props.getChecked();

        var zip = new JSZip();
        // debugger;
        // console.log(checked);
        this.setState({downloading: true});

        checked.forEach(function(item){
            // console.log(item);
            let url = "https://jon-e.net/projects/records" + item;
            zip.file(item, urlToPromise(url), {binary:true});
        });
        

        // when everything has been downloaded, we can trigger the dl
        zip.generateAsync({type:"blob"}, function updateCallback(metadata) {
            // var msg = "progression : " + metadata.percent.toFixed(2) + " %";
            // if(metadata.currentFile) {
            //     msg += ", current file = " + metadata.currentFile;
            // }
            // showMessage(msg);
            // updatePercent(metadata.percent|0);
            this.setState({progress:metadata.percent.toFixed(2)});
            // this.updateProgress(metadata.percent.toFixed(2));
            // console.log(metadata.percent.toFixed(2));
        }.bind(this))
        .then(function callback(blob) {

            // see FileSaver.js
            saveAs(blob, "scrapes.zip");

            // showMessage("done !");
        }, function (e) {
            // showError(e);
        });

        return false;
        this.setState({downloading: false});

    }

    updateProgress(progress){
        this.setState({ progress: progress});
    }

    setChecked(checked){
        this.setState({ checked: checked});
        // console.log(checked);
    }


    render(){
        return(
            <Grid container spacing={1} justify="flex-end" alignItems="center" height="100%">
            <Grid item xs={2}>
                <CircularProgress variant="static" value={this.state.progress} style={{margin:'auto', display:'block'}}/>
                
            </Grid>
            <Grid item xs={10}>
                <Button 
                onClick={this.downloadFiles}
                variant="contained" 
                color="secondary" 
                size="large"
                {...this.props.getChecked().length ? {disabled:false} : {disabled:true}}
                style={{width: "100%", height:"100%"}}>Download {this.props.getChecked().length ? this.props.getChecked().length + " Files" : ""}</Button>
            </Grid>
            </Grid>

        
        )
    }
}

class App extends React.Component {
    // classes = useStyles();

    state = {
        file: "",
        checked: [],
        expanded: [],
        filterText: '',
        nodesFiltered: nodes,
        nodes
    };

    constructor(props) {
        super(props);

        this.receiveFile = this.receiveFile.bind(this);
        this.receiveChecked = this.receiveChecked.bind(this);
        this.getChecked = this.getChecked.bind(this);
        this.receiveExpanded = this.receiveExpanded.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.filterTree = this.filterTree.bind(this);
        this.filterNodes = this.filterNodes.bind(this);
    }

    receiveFile(new_file) {
        this.setState({ file: new_file });
        // console.log("received file!!!");
    }

    receiveChecked(checked){
        this.setState({ checked });
        // console.log(checked);
        // console.log('parent checked');
        // console.log(this.state.checked);
    }

    receiveExpanded(expanded){
        this.setState({ expanded: expanded});
    }

    getChecked(checked){
        return(this.state.checked);
    }

    updateFilter(event){
        this.setState({filterText: event.target.value}, this.filterTree);
    }

    filterTree() {
        // Reset nodes back to unfiltered state
        if (!this.state.filterText) {
            this.setState((prevState) => ({
                nodesFiltered: prevState.nodes,
            }));

            return;
        }

        const nodesFiltered = (prevState) => (
            { nodesFiltered: prevState.nodes.reduce(this.filterNodes, []) }
        );

        this.setState(nodesFiltered);
    }

    filterNodes(filtered, node) {
        const { filterText } = this.state;
        const children = (node.children || []).reduce(this.filterNodes, []);

        if (
            // Node's label matches the search string
            node.label.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1 ||
            // Or a children has a matching node
            children.length
        ) {
            filtered.push({ ...node, children });
        }

        return filtered;
    }

    render() {
        const { classes } = this.props;
        const { checked,
            expanded,
            nodesFiltered} = this.state;
        // console.log("using file" + this.state.file);
        return (
            <div height="100%" width="100%" className={classes.root} style={{ padding: 10, overflow: "hidden" }}>
                <Grid container spacing={2} >
                    <Grid item xs={12} className='Header-container'>

                        <Card className="Header-card">
                        <CardContent className="Header">
                            <Grid container spacing={0} alignItems="center">
                            <Grid item xs>
                            <TextField 
                                id="filter" 
                                label="Search Scrapes" 
                                type="search" 
                                size="small" 
                                variant="outlined" 
                                color="secondary" 
                                fullWidth 
                                onChange={this.updateFilter}/>
                            </Grid>
                            <Grid item xs={4}>
                            <Downloader getChecked = {this.getChecked}/>
                            </Grid>

                            </Grid>
                        </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} style={{ height: "100%"}}>
                        <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                        <Files 
                            parentChecked={checked}
                            parentExpanded={expanded}
                            fileReporter={this.receiveFile} 
                            checkedReporter={this.receiveChecked}
                            expandedReporter={this.receiveExpanded}
                            nodes={nodesFiltered} />
                        </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}  style={{ height: "100%"}}>
                        <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                        <PDFViewer file={this.state.file} />
                        </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}



// function Files() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default withStyles(useStyles)(App);