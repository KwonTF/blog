interface InitClientArgs {
  render: () => void
}

export function initClient({render}: InitClientArgs) {
  async function initService() {
    console.log('RENDER START')
    render()
  }

  try {
    console.log('INIT START')
    initService()
  } catch (error) {
    return
  }
}
