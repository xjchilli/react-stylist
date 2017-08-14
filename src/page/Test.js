/**
 * 时尚圈
 * Created by potato on 2017/4/8.
 */
import React from 'react';
import { ToolDps } from '../ToolDps';
import { is, fromJS, Map } from 'immutable';
import { Editor, EditorState, RichUtils } from 'draft-js';



class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
        this.onChange = (editorState) => this.setState({ editorState });
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }

    componentDidMount() {
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return !(this.props === nextProps || is(this.props, nextProps)) ||
    //         !(this.state === nextState || is(this.state, nextState));
    // }

    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }

    render() {
        return (
            <div>
                <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                <Editor editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange} />
            </div>
        )
    }
}





export default Test;



