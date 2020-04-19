import React, { Component } from 'react'
import tinymce from 'tinymce'
import 'tinymce/themes/silver'
import '../../css/grids.css'
import '../../css/blocks.css'
import '../../css/main.css'
// import 'tinymce/plugins/codesample'
// import 'tinymce/plugins/table'
// import 'tinymce/plugins/image'
// import 'tinymce/plugins/spellchecker'
// import 'tinymce/plugins/lists'
// import 'tinymce/plugins/link'
// import 'tinymce/plugins/advlist'
// import 'tinymce/plugins/imagetools'
// import 'tinymce/plugins/code'
// import Prism from "prismjs"
import 'tinymce/skins/ui/oxide/skin.min.css';
// import '../theAppCss.css'

class OurEditor extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        // Prism.highlightAll()
        tinymce.init({
            selector: `#${this.props.id}`,
            disabled:true,
            toolbar:false,
            menubar:false,
            readonly:1,
            width:"100%",
            setup: editor => {
                this.setState({editor})
                let the_content = this.props.content
                editor.on('init', function(e){
                    editor.setContent(the_content)
                })
            }
        })
    }
    componentDidUpdate(prevProps) {


    }
    componentWillUnmount() {
        tinymce.remove(this.state.editor);
    }
    render() {
        console.log("Article Viewer called")
        return (

                <div className="articleTarget" id={this.props.id} />

        );
    }
}
export default OurEditor
