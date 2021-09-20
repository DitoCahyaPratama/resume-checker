import React, { Fragment } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Alert, Container } from 'reactstrap';

let count = 1;
const MINIMAL_CHARS = 1000;

const Main = ({ mdStr }) => {
  const [state, setVisiable] = React.useState({
    visiableDragbar: true,
    hideToolbar: true,
    highlightEnable: true,
    enableScroll: true,
    value: mdStr || '',
    preview: 'live',
  });
  const [alert, setAlert] = React.useState('');
  const [error, setError] = React.useState(false);
  const upPreview = (e) => {
    setVisiable({ ...state, preview: e.target.value });
  };
  const updateHandle = (str) => {
    setVisiable({ ...state, value: str });
  };
  const handleCheckChar = () => {
      console.log(state.value.length);
      try {
        const result = state.value.replace(/\s/g, '');
        const chars =  result.length;
      if (chars < MINIMAL_CHARS) {
        setError(true);
        setAlert(`Masih kurang ya teman-teman, (minimum ${MINIMAL_CHARS} chars): ${chars} chars`);
      }else{
        setError(false);
        setAlert(`Wahh teman-teman sudah melampaui check resume, (minimum ${MINIMAL_CHARS} chars): ${chars} chars`);
      }
    } catch (error) {
        setAlert(`contains unsupported character format`);
    }
  };
  return (
    <Fragment>
      <Container className="my-4">
        {
            alert !== '' && error !== true  ? (
                <Alert color="primary">
                    {alert}
                </Alert>
            ) : (
                <Alert color="danger">
                    {alert}
                </Alert>
            )

        }
        
        <MDEditor
            autoFocus
            value={state.value}
            previewOptions={{
            linkTarget: '_blank',
            }}
            height={400}
            highlightEnable={state.highlightEnable}
            hideToolbar={!state.hideToolbar}
            enableScroll={state.enableScroll}
            visiableDragbar={state.visiableDragbar}
            textareaProps={{
            placeholder: 'Please enter Markdown text',
            }}
            preview={state.preview}
            onChange={(newValue) => {
            setVisiable({ ...state, value: newValue || '' });
            }}
            onKeyUp={() => handleCheckChar()}
        />
        <div className="doc-tools">
            <label>
            <input
                type="checkbox"
                checked={state.visiableDragbar}
                onChange={(e) => {
                setVisiable({ ...state, visiableDragbar: e.target.checked });
                }}
            />
            {state.visiableDragbar ? 'Show' : 'Hidden'} Drag Bar
            </label>
            <label>
            <input
                type="checkbox"
                checked={state.highlightEnable}
                onChange={(e) => {
                setVisiable({ ...state, highlightEnable: e.target.checked });
                }}
            />
            {state.highlightEnable ? 'Enable' : 'Unenable'} highlight
            </label>
            <label>
            <input
                type="checkbox"
                checked={state.enableScroll}
                onChange={(e) => {
                setVisiable({ ...state, enableScroll: e.target.checked });
                }}
            />
            {state.enableScroll ? 'Enable' : 'Unenable'} Scroll
            </label>
            <label>
            <input
                type="checkbox"
                checked={state.hideToolbar}
                onChange={(e) => {
                setVisiable({ ...state, hideToolbar: e.target.checked });
                }}
            />
            {state.hideToolbar ? 'Show' : 'Hidden'} ToolBar
            </label>
            <label>
            <input type="radio" name="preview" value="edit" checked={state.preview === 'edit'} onChange={upPreview} />
            Edit
            </label>
            <label>
            <input type="radio" name="preview" value="live" checked={state.preview === 'live'} onChange={upPreview} />
            Live Preview
            </label>
            <label>
            <input
                type="radio"
                name="preview"
                value="preview"
                checked={state.preview === 'preview'}
                onChange={upPreview}
            />
            Preview
            </label>
            <button
            type="button"
            style={{ marginLeft: 10 }}
            onClick={() => {
                count += 1;
                updateHandle(`## Test ${count}`);
            }}
            >
            Set Value
            </button>
            <button
            type="button"
            disabled={!state.value}
            style={{ marginLeft: 10 }}
            onClick={() => {
                updateHandle(undefined);
            }}
            >
            Clear
            </button>
        </div>
      </Container>
    </Fragment>
  );
};

export default Main;