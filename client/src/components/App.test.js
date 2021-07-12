import React from "react";
import { queries, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import App from "./App";

jest.mock("mapbox-gl", () => ({
  Map: function () {
    this.on = jest.fn();
    this.remove = jest.fn();
  },
}));

const renderWithWrapper = ({ Component, props }) => {
  render(<Component {...props} />, { wrapper: Component, queries });
};

const setup = (props = {}) => renderWithWrapper({ Component: App, props });

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  server.resetHandlers();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});
afterAll(() => server.close());

test("renders stuff", async () => {
  setup();
  expect(
    await screen.findByText("Enter UELN, Passport or Microchip Number")
  ).toBeVisible();
});

test("Searches for locations and displays the results", async () => {
  const responsePayload = [
    {
      ueln: "8260001",
      date_from: "2019-01-01",
      date_to: "2019-01-02",
      location: {
        city: "Cheltenham",
        county: "Gloucestershire",
        long: "-2.078253",
        lat: "51.899387",
      },
      id: "453db467-bbc2-4869-841c-59a64dab115c",
    },
    {
      ueln: "8260001",
      date_from: "2019-01-03",
      date_to: "2019-01-04",
      location: {
        city: "Cirencester",
        county: "Gloucestershire",
        long: "-1.968243",
        lat: "51.718494",
      },
      id: "ba68160d-bc6f-42a4-8c38-bae7a1f422a5",
    },
    {
      ueln: "8260001",
      date_from: "2019-01-05",
      date_to: "2019-01-10",
      location: {
        city: "London",
        county: "London",
        long: "-0.127758",
        lat: "51.507351",
      },
      id: "9d586667-1c2e-47e1-8419-08d193480dd6",
    },
  ];

  server.use(
    rest.get(`http://localhost:4000/equines/8260001/`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(responsePayload));
    })
  );

  setup();
  userEvent.click(screen.getByText(/search now/i));
  expect(await screen.findByText(/Cheltenham/i)).toBeVisible();
  expect(await screen.findByText(/Cirencester/i)).toBeVisible();
  expect(await screen.findByText(/London/i)).toBeVisible();
  // screen.debug();
});
