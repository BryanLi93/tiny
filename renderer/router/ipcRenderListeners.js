import { withRouter } from 'react-router-dom';
const { ipcRenderer } = require('electron');

class IpcRenderListeners extends React.Component {
  componentDidMount () {
    console.log(this.props);
    ipcRenderer.on('openMenu', () => {
      this.props.history.push('/menu');
    });
  }
  render () { return null };
}

export default withRouter(IpcRenderListeners);