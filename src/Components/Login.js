import React, { Component } from "react";
import { Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import { firebaseAuthentication } from "../config/firebase";

export default class Registrasi extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    firebaseAuthentication
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        if (res.user.emailVerified) {
          window.location.href = "/";
        } else {
          alert("Verifikasi email anda terlebih dahulu!");
          firebaseAuthentication.signOut();
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  handleRegisterButton = () => {
    // Fungsi untuk mengarahkan pengguna ke halaman registrasi
    // Anda dapat mengganti URL '/registrasi' sesuai dengan URL halaman registrasi Anda
    window.location.href = "/registrasi";
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container style={styles.container}>
        <Typography variant="h6" style={styles.kasirqText}>
          KASIRQ
        </Typography>
        <Grid container justify="center">
          <Grid item xs={12} md={8} lg={4}>
            <center>
              <Typography variant="h4" style={{ ...styles.heading, fontFamily: "Poppins", color: "#15553B" }}>
                Login Here
              </Typography>
            </center>
            <form onSubmit={this.handleSubmit}>
              <TextField type="email" fullWidth margin="dense" variant="outlined" size="small" value={email} onChange={this.handleChangeField} name="email" label="Email" required />
              <TextField type="password" fullWidth margin="dense" variant="outlined" size="small" value={password} onChange={this.handleChangeField} name="password" label="Password" required />
              <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: "#15553B", color: "white", ...styles.loginButton }}>
                Login
              </Button>
            </form>
            <Button fullWidth variant="outlined" style={{ borderColor: "#15553B", color: "#15553B", ...styles.registerButton }} onClick={this.handleRegisterButton}>
              Register
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
    fontWeight: "bold",
    color: "#15553B", // Move the text up
  },
  heading: {
    marginBottom: "20px",
  },
  button: {
    marginTop: "20px",
  },
  registerButton: {
    marginTop: "20px", // Sesuaikan margin sesuai kebutuhan
    fontWeight: "bold", // Tambahkan gaya lain yang diinginkan untuk mempercantik tampilan
  },
  loginButton: {
    marginTop: "20px", // Adjusted margin for the login button
    fontWeight: "bold", // Tambahkan gaya lain yang diinginkan untuk mempercantik tampilan
  },
};

// ...
