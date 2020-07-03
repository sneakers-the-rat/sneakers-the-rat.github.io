import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import logo from './logo.svg';
import './App.css';
import Split from 'react-split';

import Viewer, { Worker } from '@phuocng/react-pdf-viewer';

import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';

// var nodes = {};

import nodes from './tree.json';


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
        this.setState({ checked });
    }

    onExpand(expanded) {
        this.setState({ expanded });
    }

    onClick(clicked) {
        this.setState({ clicked });
        this.props.fileReporter(clicked.value);
    }

    render() {
        const { checked, expanded, click } = this.state;

        return (

            <div className='Files-container'>
            <CheckboxTree
                className='Files'
                checked={checked}
                expanded={expanded}
                iconsClass="fa5"
                nodes={nodes}
                onCheck={this.onCheck}
                onExpand={this.onExpand}
                onClick={this.onClick}
            />
            </div>
        );
    }
}


class PDFViewer extends React.Component {

  static defaultProps = {
    file: ''
  }

    render() {
      console.log('pdf viewer!!')
        console.log(this.props.file);
        if (!this.props.file.endsWith('.pdf')){
          return(
            <div className='pdf-viewer'>
            </div>)
        } else {
        return (
            <div className="pdf-viewer">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                <Viewer fileUrl= {this.props.file} />
              </Worker>
            </div>)
      }
    }
}

class App extends React.Component {
    state = {
        file: ''
    };

    constructor(props){
      super(props);

      this.receiveFile = this.receiveFile.bind(this)


    }

    receiveFile(new_file){
      this.setState({file: new_file})
      console.log('received file!!!')
    };

    render() {
      console.log('using file' + this.state.file);
        return (
            <Split 
              sizes={[50,50]}
              gutterSize={10}>

                <Files fileReporter={this.receiveFile}/>

                <PDFViewer file={this.state.file}/>



              </Split>)
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



export default App;