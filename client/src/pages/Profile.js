import React from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

const Profile = () => {
  return (
    <>
      <Jumbotron fluid className="text-colour bg-colour">
        <Container>
          <h1>Welcome to your profile!</h1>
        </Container>
      </Jumbotron>
{/* <col>
  <div class="col-md-6">
    <h3>Create a New Post:</h3>

    <form class="form new-Post-form">
      <div class="form-group">
        <label for="post-name">Post Name:</label>
        <input class="form-input" type="text" id="post-name" name="post-name" />
      </div>
      <div class="form-group">
        <label for="post-desc">Description:</label>
        <textarea class="form-input" id="post-desc" name="post-desc"></textarea>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>

  {{#if posts.length}}
  <div class="col-md-6 post-list">
    <h3>Current Posts:</h3>

    {{#each posts as |post|}}
    <div class="row mb-2">
      <div class="col-md-8">
        <h4><a href="/post/{{post.id}}">{{post.name}}</a></h4>
      </div>
      <div class="col-md-4">
        <button class="btn btn-sm btn-danger" data-id="{{post.id}}">Delete</button>
      </div>
    </div>
    {{/each}}
  </div>
  {{/if}}
</div> */}

    </>
  );
};

export default Profile;