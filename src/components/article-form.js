import React from "react";
import { postArticle } from "../api/api";
import TopicForm from "./topic-form";
import { navigate } from "@reach/router";
import {
  FormTextarea,
  Card,
  CardBody,
  CardTitle,
  FormInput,
  Button
} from "shards-react";

class ArticleForm extends React.Component {
  state = {
    toggles: { body: false, title: false },
    body: null,
    title: null,
    topic: false,
    highlighting: { body: null, title: null }
  };
  handlePopOver = e => {
    const { name } = e.target;

    this.setState(
      {
        toggles: { [name]: !this.state.toggles[name] }
      },
      () => {}
    );
  };
  render() {
    const {
      highlighting: { body, title },
      topic
    } = this.state;

    return (
      <Card>
        <CardBody>
          <p className="mb-2">{"📖 What do you want to write about?"}</p>
          <CardTitle>
            <FormInput
              onBlur={this.handlePopOver}
              onFocus={this.handlePopOver}
              invalid={title === null ? null : !title}
              valid={title}
              onChange={this.handleChange}
              name="title"
              id="title"
            />
          </CardTitle>
          <p className="mb-2">{"🤔 What's the content?"}</p>
          <FormTextarea
            onBlur={this.handlePopOver}
            onFocus={this.handlePopOver}
            invalid={body === null ? null : !body}
            valid={body}
            name="body"
            id="body"
            style={{ height: "200px" }}
            onChange={this.handleChange}
          />
          <TopicForm token={this.props.token} setTopic={this.setTopic} />
          <Button
            onClick={this.handleSubmit}
            disabled={body && title && topic ? false : true}
            className="col-4 offset-4 mt-5"
            theme="success"
          >
            Post!
          </Button>
        </CardBody>
      </Card>
    );
  }
  handlePopOver = e => {
    const { name } = e.target;

    this.setState({
      toggles: { [name]: !this.state.toggles[name] }
    });
  };
  handleChange = e => {
    const { name, value } = e.target;
    const { highlighting } = this.state;

    switch (name) {
      case "body":
        value.length > 25
          ? (highlighting[name] = true)
          : (highlighting[name] = false);

        break;
      default:
        value.length > 10 && value.length < 70
          ? (highlighting[name] = true)
          : (highlighting[name] = false);

        break;
    }
    this.setState({ highlighting });
    this.state.highlighting[name]
      ? this.setState({ [name]: value })
      : this.setState({ [name]: "" });

    this.setState({ highlighting });
  };
  handleSubmit = () => {
    const { body, title, topic } = this.state;
    const article = { body, title, topic, username: this.props.loggedInUser };
    postArticle(article, this.props.token)
      .then(article => {
        navigate(`/articles/${article.article_id}`);
      })
      .catch(() => {
        navigate("/error", {
          replace: true,
          state: { msg: "dunno why this would error" }
        });
      });
  };
  setTopic = topic => {
    this.setState({ topic });
  };
}

export default ArticleForm;
