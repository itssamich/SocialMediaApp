import React from "react";

export default function PostPage(){

    const [showModule, setShow] = useState(true)

    const handleClose = () => {
		setShow(false)
	}
	const handleShow = () => {
		setShow(true)
	}

    return(
        <div className="test">TESTER</div>
        // <Modal show={showModule} onHide={handleClose}>
        //     <Modal.Title><h1>--</h1></Modal.Title>
        //     <Modal.Body>
        //         Post Body
        //     </Modal.Body>
        //     <Modal.Footer>
        //         Post Options
        //     </Modal.Footer>
	    // </Modal>
    )
}