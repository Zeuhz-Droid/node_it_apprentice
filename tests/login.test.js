const { login } = require("../controllers/authController");
const User = require("../models/userModel");
const httpMocks = require("node-mocks-http");
const bcrypt = require("bcrypt");

jest.mock("../models/userModel");

describe("Login Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  it("should call next with error if user does not exist or password is incorrect", async () => {
    req.body = { email: "oustead@example.com", password: "password123" };

    User.findOne.mockImplementation(() => ({
      select: jest.fn().mockResolvedValue(null),
    }));

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith("Incorrect email or password");
  });

  it("should call next with error if password is incorrect", async () => {
    req.body = { email: "test@example.com", password: "wrongpassword" };
    const password = await bcrypt.hash("correctpassword", 12);
    User.findOne.mockImplementation(() => ({
      select: jest.fn().mockResolvedValue({
        email: "test@example.com",
        password,
        correctPassword: jest.fn().mockResolvedValue(false),
      }),
    }));

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith("Incorrect email or password");
  });

  it("should login user and return 200 if credentials are correct", async () => {
    req.body = { email: "test@example.com", password: "correctpassword" };
    const password = await bcrypt.hash("correctpassword", 12);

    User.findOne.mockImplementation(() => ({
      select: jest.fn().mockResolvedValue({
        email: "test@example.com",
        password,
        correctPassword: jest.fn().mockResolvedValue(true),
      }),
    }));

    await login(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      status: "successfully logged in",
      data: {
        user: {
          email: "test@example.com",
          password: undefined,
        },
      },
    });
  });
});
