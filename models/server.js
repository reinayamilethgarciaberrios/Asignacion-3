const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      user: "/api/users",
      auth: "/api/auth",
      category: "/api/categories",
      product: "/api/products",
      find: "/api/find",
      uploads: "/api/uploads",
      invoice: "/api/invoices", 
      detailInvoice:"/api/detailInvoices"
      

    };

    
    this.ConnectDB();
    
    this.middleware();
  
    this.routes();
  }

  async ConnectDB() {
    await dbConnection();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.user, require("../routes/user.routes"));
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.category, require("../routes/category.routes"));
    this.app.use(this.paths.product, require("../routes/product.routes"));
    this.app.use(this.paths.find, require("../routes/find.routes"));
    this.app.use(this.paths.uploads, require("../routes/upload.routes"));
    this.app.use(this.paths.invoice, require("../routes/invoice.routes"));
    this.app.use(this.paths.detailInvoice, require("../routes/detailInvoice.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`POO Server is working in port: ${this.port}`);
    });
  }
}

module.exports = Server;

