const setup = require("./utilities")
const { events } = require("@budibase/backend-core")

describe("/dev", () => {
  let request = setup.getRequest()
  let config = setup.getConfig()

  afterAll(setup.afterAll)

  beforeEach(async () => {
    await config.init()
    jest.clearAllMocks()
  })

  describe("revert", () => {
    it("should revert the application", async () => {
      await request
        .post(`/api/dev/${config.getAppId()}/revert`)
        .set(config.defaultHeaders())
        .expect("Content-Type", /json/)
        .expect(200)
      expect(events.app.reverted.mock.calls.length).toBe(1)
    })
  })
})