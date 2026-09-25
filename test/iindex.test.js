/**
 * @jest-environment jsdom
 */


const {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
} = require("../index.js");

beforeEach(() => {
  document.body.innerHTML = `
    <div id="test-container"></div>
    <div id="dynamic-content"></div>

    <button id="simulate-click">Click Me</button>

    <form id="user-form">
      <input type="text" />
      <button type="submit">Submit</button>
    </form>

    <div id="error-message" class="hidden"></div>
  `;
});

test("addElementToDOM adds content to the correct DOM element", () => {
  addElementToDOM("test-container", "Hello World");

  const container = document.getElementById("test-container");

  expect(container.innerHTML).toBe("Hello World");
});

test("removeElementFromDOM removes an existing element", () => {
  const element = document.createElement("div");
  element.id = "remove-me";
  document.body.appendChild(element);

  removeElementFromDOM("remove-me");

  expect(document.getElementById("remove-me")).toBeNull();
});

test("simulateClick updates the DOM with the expected content", () => {
  simulateClick("dynamic-content", "Button Clicked!");

  const container = document.getElementById("dynamic-content");

  expect(container.innerHTML).toBe("Button Clicked!");
});

test("handleFormSubmit updates the page when input contains valid text", () => {
  const form = document.getElementById("user-form");
  const input = form.querySelector("input");

  input.value = "Hello World";

  handleFormSubmit("user-form", "dynamic-content");

  expect(document.getElementById("dynamic-content").innerHTML).toBe(
    "Hello World"
  );

  expect(document.getElementById("error-message").classList.contains("hidden")).toBe(true);
});

test("handleFormSubmit displays error when input is empty", () => {
  handleFormSubmit("user-form", "dynamic-content");

  const errorMessage = document.getElementById("error-message");

  expect(errorMessage.textContent).toBe("Input cannot be empty");
  expect(errorMessage.classList.contains("hidden")).toBe(false);
});