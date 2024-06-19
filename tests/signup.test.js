const { signup } = require("../controllers/authController");
const User = require("../models/userModel");
const httpMocks = require("node-mocks-http");

jest.mock("../models/userModel");

describe("Signup Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  it("should return 404 if user already exists", async () => {
    req.body = { email: "chronic@example.com", password: "123456" };

    User.findOne.mockResolvedValue(true);

    await signup(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({
      status: "fail",
      message: "User with email already exists.",
    });
  });

  it("should create a new user and return 200 if user does not exist", async () => {
    req.body = { email: "janedoe@example.com", password: "000111" };

    User.findOne.mockResolvedValue(false);
    User.create.mockResolvedValue({
      email: "janedoe@example.com",
      password: "hashedpassword",
    });

    await signup(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      status: "success",
      data: {
        newUser: {
          email: "janedoe@example.com",
          password: "hashedpassword",
        },
      },
    });
  });

  it("should call next with error if an error occurs", async () => {
    const errorMessage = "An error occurred";
    const rejectedPromise = Promise.reject(new Error(errorMessage));

    User.findOne.mockReturnValue(rejectedPromise);

    await signup(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
