import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';

const HotelModal = ({data}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // For update User State
  const [editData, setEditData] = useState(data);

  const [file, setFile] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/kmfoysal/image/upload",
      data
    );

    const { url } = uploadRes.data;

    const updateCurrentUser = {
      name: editData?.name,
      username: editData?.username,
      email: editData?.email,
      password: editData?.password,
      address: editData?.address,
      phone: editData?.phone,
      profilePic: url,
      isAdmin: editData?.isAdmin,
    };

    try {
      await axios.put(
        `http://localhost:5000/api/users/${editData?._id}`,
        updateCurrentUser
      );

      handleClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateChange = (e) => {
    const type = e.target.type;

    const name = e.target.name;

    const value = type === "file" ? e.target.files[0] : e.target.value;

    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div>
              <div className="formInput text-center mb-4">
                <img
                  className="rounded-circle"
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : data?.profilePic
                      ? data?.profilePic
                      : "https://images.vexels.com/media/users/3/147102/isolated/lists/082213cb0f9eabb7e6715f59ef7d322a-instagram-profile-icon.png"
                  }
                  alt="img"
                  width={100}
                />
                {!file && (
                  <label
                    htmlFor="file"
                    className="d-flex flex-column justify-content-center align-items-center"
                  >
                    Upload Hotel images
                    <input
                      type="file"
                      name="profilePic"
                      onChange={(e) => setFile(e.target.files[0])}
                      placeholder="Upload profile picture"
                      style={{ width: "100px" }}
                    />
                  </label>
                )}
              </div>
            </div>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="name"
                  label="Hotel Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter hotel Name ... "
                    value={editData?.name}
                    onChange={handleUpdateChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="type" label="Type">
                  <Form.Select
                    aria-label="type"
                    name="type"
                    value={editData?.type}
                    onChange={handleUpdateChange}
                  >
                    <option>Select hotel type</option>
                    <option value="hotel">Hotel</option>
                    <option value="Apartment">Apartment</option>
                    <option value="resort">Resort</option>
                    <option value="villa">Villa</option>
                    <option value="guest house">Guest House</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel controlId="city" label="City" className="mb-3">
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="Enter city Name ... "
                    value={editData?.city}
                    onChange={handleUpdateChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="address"
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter  Address ... "
                    value={editData?.address}
                    onChange={handleUpdateChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel controlId="title" label="title" className="mb-3">
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter title ... "
                    value={editData?.title}
                    onChange={handleUpdateChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="distance"
                  label="Distance from center"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="distance"
                    placeholder="Enter distance ... "
                    value={editData?.distance}
                    onChange={handleUpdateChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <FloatingLabel
              controlId="desc"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                type="text-area"
                name="distance"
                placeholder="Enter Description ... "
                height={300}
                value={editData?.desc}
                onChange={handleUpdateChange}
              />
            </FloatingLabel>
            <Row>
              <Col>
                <FloatingLabel controlId="rating" label="Rating">
                  <Form.Select
                    aria-label="Rating"
                    name="rating"
                    value={editData.rating}
                    onChange={handleUpdateChange}
                  >
                    <option>Select Rating</option>
                    <option value={5}>5 Star</option>
                    <option value={4}>4 Star</option>
                    <option value={3}>3 Star</option>
                    <option value={2}>2 Star</option>
                    <option value={1}>1 Star</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="cheapestPrice"
                  label="Cheapest Price"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    name="cheapestPrice"
                    placeholder="Enter Description ... "
                    height={300}
                    value={editData?.cheapestPrice}
                    onChange={handleUpdateChange}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="featured" label="Featured hotel">
                  <Form.Select
                    aria-label="User Role"
                    name="featured"
                    onChange={handleUpdateChange}
                  >
                    <option>Is it Featured hotel ?</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>

            <button type="submit" className="headerBtn banner-btn mt-3 w-100">
              UPDATE
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HotelModal;