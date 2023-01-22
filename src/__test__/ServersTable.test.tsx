import { fireEvent, screen } from "@testing-library/react";
import { ServersTable } from "../components/ServersTable";
import { Server } from "../types/types";
import { renderWithProviders } from "../utils/test-utils";

const defaultItems: Server[] = [
  {
    name: "Latvia #1",
    distance: 1407,
  },
  {
    name: "United States #1",
    distance: 1977,
  },
  {
    name: "Japan #1",
    distance: 1514,
  },
];

const setupComponent = (items: Server[] = defaultItems) => {
  renderWithProviders(<ServersTable items={items} />);
};

describe("Servers Table", () => {
  it("should render the servers table with header and items", () => {
    const numberOfHeaders = 1;

    setupComponent();

    const table = screen.getByRole("table");
    const columnHeader = screen.getAllByRole("columnheader");
    const rows = screen.getAllByRole("row");

    expect(table).toBeInTheDocument();
    expect(columnHeader[0]).toHaveTextContent("Servers▲▼");
    expect(columnHeader[1]).toHaveTextContent("Distance▲▼");
    expect(rows.length).toBe(numberOfHeaders + defaultItems.length);
  });

  it("should allow the user to sort server name ascending", () => {
    setupComponent();

    const button = screen.getByTestId("Servers-button-ascending");

    fireEvent.click(button);

    const rows = screen.getAllByRole("row");

    expect(rows[1]).toHaveTextContent("United States");
    expect(rows[2]).toHaveTextContent("Latvia");
    expect(rows[3]).toHaveTextContent("Japan");
  });

  it("should allow the user to sort server name descending", () => {
    setupComponent();

    const button = screen.getByTestId("Servers-button-descending");

    fireEvent.click(button);

    const rows = screen.getAllByRole("row");

    expect(rows[1]).toHaveTextContent("Japan");
    expect(rows[2]).toHaveTextContent("Latvia");
    expect(rows[3]).toHaveTextContent("United States");
  });

  it("should allow the user to sort distance ascending", () => {
    setupComponent();

    const button = screen.getByTestId("Distance-button-ascending");

    fireEvent.click(button);

    const rows = screen.getAllByRole("row");

    expect(rows[1]).toHaveTextContent("1977");
    expect(rows[2]).toHaveTextContent("1514");
    expect(rows[3]).toHaveTextContent("1407");
  });

  it("should allow the user to sort distance descending", () => {
    setupComponent();

    const button = screen.getByTestId("Distance-button-descending");

    fireEvent.click(button);

    const rows = screen.getAllByRole("row");

    expect(rows[1]).toHaveTextContent("1407");
    expect(rows[2]).toHaveTextContent("1514");
    expect(rows[3]).toHaveTextContent("1977");
  });

  it("should allow the user to select the row", () => {
    setupComponent();

    const rows = screen.getAllByRole("row");

    fireEvent.click(rows[1]);

    expect(rows[1]).toHaveClass("table__row--selected");
  });
});
