import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../src/app.js";

describe("GET /api/v1", () => {
  it("responds with a json message", () =>
    request(app)
      .get("/api/v1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, {
        message: "API - OK",
      }));
});

describe("GET /api/v1/orders", () => {
  it("responds with paginated orders", () =>
    request(app)
      .get("/api/v1/orders?page=1&limit=2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("data");
        expect(Array.isArray(res.body.data)).toBe(true);
      }));
});

describe("GET /api/v1/products", () => {
  it("responds with paginated products", () =>
    request(app)
      .get("/api/v1/products?limit=2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("data");
        expect(Array.isArray(res.body.data)).toBe(true);
      }));
});
