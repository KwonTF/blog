interface InitClientArgs {
  render: () => void
}

export function initClient({render}: InitClientArgs) {
  async function initService() {
    render()
  }

  try {
    initService()
  } catch (error) {
    return
  }
}
