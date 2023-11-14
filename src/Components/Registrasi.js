import React, { Component } from "react";
import { Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { firebaseAuthentication } from "../config/firebase";

export default class Registrasi extends Component {
  state = {
    email: "",
    NoTelpn: "",
    password: "",
    konfirmpassword: "",
  };

  handleChangeField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, NoTelpn, password, konfirmpassword } = this.state;
    if (NoTelpn.length < 1) {
      alert("Nomor telepon harus diisi.");
      return;
    }

    if (password !== konfirmpassword) {
      alert("Konfirmasi password tidak sesuai.");
      return;
    }
    firebaseAuthentication
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebaseAuthentication.currentUser
          .sendEmailVerification()
          .then(() => {
            alert("Mohon verifikasi email anda");
            this.props.history.push("/login");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  render() {
    const { email, password, NoTelpn, konfirmpassword } = this.state;
    return (
      <Container style={styles.container}>
        <Typography variant="h6" style={styles.kasirqText}>
          KASIRQ
        </Typography>
        <Grid container justify="center">
          <Grid item xs={12} md={8} lg={4}>
            <center>
              <Typography variant="h4" style={{ ...styles.heading, fontFamily: "Poppins", color: "#15553B" }}>
                Create Account
              </Typography>
            </center>

            <form onSubmit={this.handleSubmit}>
              <TextField type="email" fullWidth margin="dense" variant="outlined" size="small" value={email} onChange={this.handleChangeField} name="email" label="Email" required />
              <TextField type="tel" fullWidth margin="dense" variant="outlined" size="small" value={NoTelpn} onChange={this.handleChangeField} name="NoTelpn" label="Nomor Telepon" required />
              <TextField type="password" fullWidth margin="dense" variant="outlined" size="small" value={password} onChange={this.handleChangeField} name="password" label="Password" required />
              <TextField type="password" fullWidth margin="dense" variant="outlined" size="small" value={konfirmpassword} onChange={this.handleChangeField} name="konfirmpassword" label="Konfirmasi Password" required />
              <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: "#15553B", color: "white", ...styles.registerBotton }}>
                Register
              </Button>
            </form>
            <Button component={Link} to="/login" fullWidth variant="outlined" style={{ borderColor: "#15553B", color: "#15553B", ...styles.loginButton }}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const styles = {
  container: {
    marginTop: "40px", // Sesuaikan margin sesuai kebutuhan
  },
  kasirqText: {
    marginBottom: "90px",
    color: "#15553B",
    fontWeight: "bold",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  button: {
    marginTop: "50px",
  },
  loginButton: {
    marginTop: "10px", // Sesuaikan margin sesuai kebutuhan
    fontWeight: "bold", // Tambahkan gaya lain yang diinginkan untuk mempercantik tampilan
  },
  registerBotton: {
    marginTop: "20px", // Sesuaikan margin sesuai kebutuhan
    fontWeight: "bold", // Tambahkan gaya lain yang diinginkan untuk mempercantik tampilan
  },
  // center: {
  //   color: "#15553B",
  // },
};
