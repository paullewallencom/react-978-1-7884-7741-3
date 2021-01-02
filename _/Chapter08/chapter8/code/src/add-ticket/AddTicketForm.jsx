import React, { Component } from 'react';
import firebase from '../firebase/firebase-config';
import { ToastSuccess, ToastDanger } from 'react-toastr-basic';

class AddTicketForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    console.log(props.userInfo);

    this.state = {
      uId: props.userId,
      email: props.userInfo[0].email,
      issueType: "",
      department: "",
      comment: "",
      snapshot: null
    }
  }

  fileUpload(file) {
    console.log('Upload a blob or file!', file);
    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'mountains.jpg'
    var snapshotRef = storageRef.child('ticket_snapshots/image.jpg');

    snapshotRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  onChange(e) {
    this.setState({snapshot:e.target.files[0]})
  }

  handleSubmitEvent(e) {
    e.preventDefault();
    var _this = this;
    var storageRef = firebase.storage().ref();
    console.log("sn ", this.state.snapshot)
    // Create a reference to 'image'
    var snapshotRef = storageRef.child('ticket_snapshots/'+this.state.snapshot.name);

    snapshotRef.put(this.state.snapshot).then(function(res) {
      console.log('Uploaded a blob or file!');

      console.log(res.metadata);

      const userId = _this.state.uId;
      var data = {
        date: Date(),
        email: _this.state.email,
        issueType: _this.state.issueType,
        department: _this.state.department,
        comments: _this.state.comment,
        status: "progress",
        snapshotURL: res.metadata.downloadURLs[0]
      }

      console.log(data);


      var newTicketKey = firebase.database().ref('/helpdesk').child('tickets').push().key;
      // Write the new ticket data simultaneously in the tickets list and the user's ticket list.
      var updates = {};
      updates['/helpdesk/tickets/' + userId + '/' + newTicketKey] = data;
      updates['/helpdesk/tickets/all/' + newTicketKey] = data;

      return firebase.database().ref().update(updates).then(() => {
        ToastSuccess("Saved Successfully!!");
        _this.setState({
          issueType: "",
          department: "",
          comment: "",
          snapshot: _this.state.snapshot
        });
      }).catch((error) => {
        ToastDanger(error.message);
      });

    });

   
    

    //React form data object

  }
  render() {
    var style = { color: "#ffaaaa" };
    return (
      <form onSubmit={this.handleSubmitEvent} >
        <div className="form-group">
          <label htmlFor="email">Email <span style={style}>*</span></label>
          <input type="text" id="email" className="form-control"
            placeholder="Enter email" value={this.state.email} disabled required onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="issueType">Issue Type <span style={style}> *</span></label>
          <select className="form-control" value={this.state.issueType} id="issueType" required onChange={this.handleChange}>
            <option value="">Select</option>
            <option value="Access Related Issue">Access Related Issue</option>
            <option value="Email Related Issues">Email Related Issues</option>
            <option value="Hardware Request">Hardware Request</option>
            <option value="Health & Safety">Health & Safety</option>
            <option value="Network">Network</option>
            <option value="Intranet">Intranet</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="department">Assign Department
        <span style={style}> *</span></label>
          <select className="form-control" value={this.state.department} id="department" required onChange={this.handleChange}>
            <option value="">Select</option>
            <option value="Admin">Admin</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Development">Development</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments <span style={style}> *</span></label>
          (<span id="maxlength"> 200 </span> characters left)
            <textarea className="form-control" rows="3" id="comment" value={this.state.comment} onChange={this.handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="fileUpload">Snapshot</label>
          <input id="snapshot" type="file" onChange={this.onChange} />
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="reset" className="btn btn-default">cancel</button>
        </div>
      </form>
    );
  }
}

export default AddTicketForm;
