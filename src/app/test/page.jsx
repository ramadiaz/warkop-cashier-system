import Modal from "@/components/Utilities/Modal"

const Page = () => {
    return (
        <div>
          <h1>Parent Component</h1>
          <Modal text="Open Child Modal" disable={false}>
            <h2>Child Modal</h2>
            <Modal text="Open Grandchild Modal" disable={false} defaultOpen={true}>
              <h3>Grandchild Modal</h3>
            </Modal>
          </Modal>
        </div>
      );
}

export default Page