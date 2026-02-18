import { html, fixture, expect } from '@open-wc/testing';
import "../counter-app-sp.js";

describe("CounterAppSp test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <counter-app-sp
        title="title"
      ></counter-app-sp>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
