import React, { Component } from 'react';
import {
  Grid,
  List,
  Form,
  Button,
  Icon,
  Card,
  Image,
  Label,
  Checkbox,
  Divider,
  Message,
  Segment,
  Statistic
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

import './style.css';

export default class Subscription extends Component {
  render() {
    return (
      <div>
        <Grid columns={16} className="boxShadow">
          <Grid.Column mobile={16}>
            <strong>Organisation Details</strong>
          </Grid.Column>
          <Grid.Column mobile={16} computer={4}>
            <Dropzone className="fileUpload">
              <div>
                <p>Drag file here, or Click to select file to upload</p>
                <Icon name="upload" />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column mobile={16} computer={12}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input label="Organisation Name" required />
                <Form.Input label="Phone Number" required />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input label="Provider ID" required />
                <Form.Input label="Contact Person in IT" required />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.TextArea label="Address" rows={2} required />
                <Form.Input label="Website" required />
              </Form.Group>
              <Form.Group inline>
                <label>Type *</label>
                <Form.Radio label="Hospital" value="hospital" />
                <Form.Radio label="Clinic" value="clinic" />
                <Form.Radio
                  label="Individual Provider"
                  value="individual-provider"
                />
              </Form.Group>
              <Button
                content="Add Organisation"
                icon="add"
                labelPosition="left"
                floated="right"
              />
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
