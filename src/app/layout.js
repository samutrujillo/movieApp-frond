import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movie App",
  description: "Your favorite movie application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="header">
          <Container fluid>
            <Row className="align-items-center py-3">
              <Col xs={12} sm={6} md={3} className="mb-3 mb-sm-0">
                <Image src="/images/logo.png" alt="logo" className="header-img img-fluid" style={{ maxHeight: '50px' }} />
              </Col>
              <Col xs={12} sm={6} md={6} className="mb-3 mb-sm-0 text-center text-sm-start">
                <Button variant="link" className="btn-1 me-3">Popular</Button>
                <Button variant="link" className="btn-2">Favorites</Button>
              </Col>
              <Col xs={12} md={3} className="d-flex justify-content-center justify-content-md-end">
                <Image src="/images/Frame.png" alt="frame" className="header-frame img-fluid" style={{ maxHeight: '40px' }} />
              </Col>
            </Row>
          </Container>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}