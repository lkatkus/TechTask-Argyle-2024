import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Accordion } from "./Accordion";

describe("Accordion", () => {
  it("renders the label", () => {
    render(
      <Accordion label="SomeLabel">
        <div>SomeContent</div>
      </Accordion>
    );

    expect(screen.getByTestId("AccordionLabel")).toHaveTextContent("SomeLabel");
  });

  it("does not show content by default", () => {
    render(
      <Accordion label="SomeLabel">
        <div>SomeContent</div>
      </Accordion>
    );

    expect(
      screen.queryByTestId("AccordionContentContainer")
    ).not.toBeInTheDocument();
  });

  it("toggles content visibility when clicking the label", () => {
    render(
      <Accordion label="SomeLabel">
        <div>SomeContent</div>
      </Accordion>
    );

    expect(
      screen.queryByTestId("AccordionContentContainer")
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("AccordionLabelWrapper"));

    expect(
      screen.queryByTestId("AccordionContentContainer")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("AccordionContentContainer")).toHaveTextContent(
      "SomeContent"
    );
  });
});
