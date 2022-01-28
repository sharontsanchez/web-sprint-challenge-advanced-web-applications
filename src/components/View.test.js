import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import View from "./View";
import articleServices from "./../services/articleServices";
const moment = require("moment");

jest.mock("./../services/articleServices");

const testArticles = [
  {
    id: 1,
    headline: "Headline 1",
    createdOn: moment()
      .subtract(Math.random() * 10, "days")
      .format(),
    author: "Author 1",
    image: 134,
    summary: "Summary 1",
    body: "Body 1",
  },
  {
    id: 2,
    headline: "Headline 2",
    createdOn: moment()
      .subtract(Math.random() * 10, "days")
      .format(),
    author: "Author 2",
    image: 175,
    summary: "Summary 2",
    body: "Body 2",
  },
  {
    headline: "Headline 3",
    id: 3,
    createdOn: moment()
      .subtract(Math.random() * 10, "days")
      .format(),
    author: "Author 2",
    image: 171,
    summary: "Summary 3",
    body: "Body 3",
  },
];

test("renders zero articles without errors", async () => {
  articleServices.mockResolvedValueOnce([]);
  
  render(<View />);

  await waitFor(() => {
    const articles = screen.queryAllByTestId("article");
    expect(articles).toHaveLength(0);
  });
});

test("renders three articles without errors", async () => {
  articleServices.mockResolvedValueOnce(testArticles);

  render(<View />);

  await waitFor(() => {
    const articles = screen.queryAllByTestId("article");
    expect(articles).toHaveLength(3);
  });
});

//Task List
//1. Complete the above two tests. Make sure to mocking the articleService call before rendering.