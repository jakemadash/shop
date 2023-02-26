import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../components/App";
import Home from "../components/Home";
import { Routes, Route, HashRouter } from "react-router-dom";

const mockApp = () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { price: 109.95, title: "backpack", category: "men's clothing" },
          { price: 22.3, title: "shirt", category: "women's clothing" },
        ]),
    })
  );
  render(<App />);
};

describe("App component", () => {
  it("displays error message if API response not okay", async () => {
    const response = new Response(null, { status: 404 });
    global.fetch = jest.fn(() => Promise.resolve(response));
    await render(<App />);
    expect(screen.getByRole("generic", { name: "App" }).textContent).toMatch(
      "An error occurred. Please refresh the page or try again later."
    );
  });

  it("displays loading wheel while product cards are loading, product gallery otherwise", async () => {
    mockApp();
    expect(
      screen.getByRole("generic", { name: "loading" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("generic", { name: "product-gallery" })
    ).toBeNull();

    const productGallery = await screen.findByRole("generic", {
      name: "product-gallery",
    });
    expect(productGallery).toBeInTheDocument();
    expect(screen.queryByRole("generic", { name: "loading" })).toBeNull();
  });

  it('routes to correct URLs when corresponding buttons/links clicked', async () => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { price: 109.95, title: "backpack", category: "men's clothing" },
          { price: 22.3, title: "shirt", category: "women's clothing" },
        ]),
    })
  );

  render(<HashRouter>
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/products" element={<App />} />
    </Routes>
  </HashRouter>);

    userEvent.click(screen.getByText('Shop now')) 
    expect(await screen.findByText('Electronics')).toBeInTheDocument() // shop page

    userEvent.click(screen.getByText('Home')) // first path to home page
    expect(await screen.findByText('Shop now')).toBeInTheDocument()  

    userEvent.click(screen.getByText('Shop now')) 
    expect(await screen.findByText('Electronics')).toBeInTheDocument() 

    userEvent.click(screen.getByText('Pop Shop')) // second path to home page
    expect(await screen.findByText('Shop now')).toBeInTheDocument()   
  })
 
  it("adds distinct products to cart that match product card", async () => {
    mockApp();
    const backpack = await screen.findByRole("generic", { name: "backpack" });
    const shirt = await screen.findByRole("generic", { name: "shirt" });

    userEvent.click(within(backpack).getByRole("button")); // add backpack to cart
    userEvent.click(within(shirt).getByRole("button")); // add shirt to cart
    userEvent.click(screen.getByAltText("shopping bag")); // click into cart

    expect(
      screen.getByRole("generic", { name: "$109.95" }) // cart entry for backpack
    ).toBeInTheDocument();
    expect(screen.getByRole("generic", { name: "$22.30" })) // cart entry for shirt
      .toBeInTheDocument();
  });

  it("updates quantity of existing product in cart", async () => {
    mockApp();
    const backpack = await screen.findByRole("generic", { name: "backpack" });
    userEvent.type(within(backpack).getByRole("spinbutton"), "{backspace}"); // delete default value 1
    userEvent.type(within(backpack).getByRole("spinbutton"), "2"); // enter quantity 2
    userEvent.click(within(backpack).getByRole("button")); // add to cart

    userEvent.click(screen.getByAltText("shopping bag")); // click into cart
    const cartItem = await screen.findByRole("generic", { name: "cart-item" });
    expect(within(cartItem).getByRole("spinbutton")).toHaveValue(2);

    userEvent.click(screen.getByRole("button", { name: "close" })); // close cart
    userEvent.type(within(backpack).getByRole("spinbutton"), "{backspace}");
    userEvent.type(within(backpack).getByRole("spinbutton"), "1");
    userEvent.click(within(backpack).getByRole("button"));

    userEvent.click(screen.getByAltText("shopping bag"));
    expect(within(cartItem).getByRole("spinbutton")).toHaveValue(3);
  });

  it("deletes product from cart", async () => {
    mockApp();
    const backpack = await screen.findByRole("generic", { name: "backpack" });
    userEvent.click(within(backpack).getByRole("button")); // add to cart
    userEvent.click(screen.getByAltText("shopping bag")); // click into cart
    const cartItem = await screen.findByRole("generic", { name: "cart-item" });
    userEvent.click(within(cartItem).getByAltText("trash"));
    expect(cartItem).not.toBeInTheDocument();
  });

  it("updates order total upon cart change", async () => {
    mockApp();
    const backpack = await screen.findByRole("generic", { name: "backpack" });
    userEvent.click(within(backpack).getByRole("button")); // add to cart
    userEvent.click(screen.getByAltText("shopping bag")); // click into cart

    const total = screen.getByRole("generic", { name: "total" });
    expect(within(total).getByText("Total: $109.95")).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: "close" })); // close cart
    userEvent.click(within(backpack).getByRole("button"));
    userEvent.click(screen.getByAltText("shopping bag"));
    expect(within(total).getByText("Total: $219.90")).toBeInTheDocument();

    const cartItem = await screen.findByRole("generic", { name: "cart-item" });
    userEvent.click(within(cartItem).getByAltText("trash"));
    expect(within(total).getByText("Total: $0.00")).toBeInTheDocument();
  });

  it("doesn't include number on cart icon until products added, updates number after that", async () => {
    mockApp();
    const quantity = screen.getByRole("generic", { name: "quantity" });
    expect(within(quantity).getByText("")).toBeInTheDocument();

    const backpack = await screen.findByRole("generic", { name: "backpack" });
    userEvent.click(within(backpack).getByRole("button"));
    expect(within(quantity).getByText("1")).toBeInTheDocument();
    userEvent.click(within(backpack).getByRole("button"));
    expect(within(quantity).getByText("2")).toBeInTheDocument();
  });

  it("displays 'all' category by default, updates when other category selected", async () => {
    mockApp();
    let displayedProducts = await screen.findAllByRole("generic", {
      name: "product",
    });
    expect(displayedProducts).toHaveLength(2); // 'all' case

    userEvent.click(screen.getByText("Men's Clothing"));
    displayedProducts = await screen.findAllByRole("generic", {
      name: "product",
    });
    expect(displayedProducts).toHaveLength(1);
    expect(
      screen.getByRole("generic", { name: "backpack" })
    ).toBeInTheDocument();

    userEvent.click(screen.getByText("All"));
    displayedProducts = await screen.findAllByRole("generic", {
      name: "product",
    });
    expect(displayedProducts).toHaveLength(2); 
  });
});
