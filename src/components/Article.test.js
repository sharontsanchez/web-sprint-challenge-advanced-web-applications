import React from "react";
import "@testing-library/jest-dom";
const moment = require("moment");
import userEvent from "@testing-library/user-event";
import Article from "./Article";
import { render, screen } from "@testing-library/react";

const testArticle = {
  id: 123,
  headline: "Testing Article Headline",
  createdOn: moment()
    .subtract(Math.random() * 10, "days")
    .format(),
  author: "Test Author",
  image: "",
  summary: "This is the test summary",
  body: "This is the test body text",
};

test("renders component without errors", () => {
  render(<Article article={{}} />);
});

test("renders headline, author from the article when passed in through props", () => {
  render(<Article article={testArticle} />);

  const headline = screen.getByTestId("headline");
  const author = screen.getByTestId("author");
  const summary = screen.getByTestId("summary");
  const body = screen.getByTestId("body");

  expect(headline).toBeInTheDocument();
  expect(author).toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(body).toBeInTheDocument();

  expect(headline).toHaveTextContent(/Testing Article Headline/i);
  expect(author).toHaveTextContent(/Test Author/i);
  expect(summary).toHaveTextContent(/This is the test summary/i);
  expect(body).toHaveTextContent(/This is the test body text/i);
});

test('renders "Associated Press" when no author is given', () => {
  render(<Article article={{ ...testArticle, author: null }} />);

  const author = screen.getByTestId("author");
  expect(author).toHaveTextContent(/Associated Press/i);
});

test("executes handleDelete when the delete button is pressed", () => {
  const mockHandleDelete = jest.fn();

  render(<Article article={testArticle} handleDelete={mockHandleDelete} />);

  const deleteButton = screen.getByTestId("deleteButton");
  userEvent.click(deleteButton);
  expect(mockHandleDelete).toBeCalledTimes(1);
});

//Task List:
//1. Complete all above tests. Create test article data when needed.
