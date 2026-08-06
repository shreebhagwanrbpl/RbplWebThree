"use client";

import toast, { Toaster } from "react-hot-toast";
import "./contact.css";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc
} from "firebase/firestore";
import { usePathname } from "next/navigation";

export default function Contact() {
  const [loading, setLoading] = useState(true);
  const [stateName, setStateName] = useState("");
  const [validCity, setValidCity] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [contactInfo, setContactInfo] = useState([]);

  const phoneNumbers = [
    { number: "9257984336", label: "Sales & Inquiries", formatted: "+91 92579 84336" },
    { number: "8529833535", label: "Support & Orders", formatted: "+91 85298 33535" },
    { number: "9983301657", label: "Helpline", formatted: "+91 99833 01657" },
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "globalbiomedicalsin", "pages", "contact")
        );
        if (snap.exists()) {
          setContactInfo(snap.data().contactInfo || []);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    load();
  }, []);

  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const reservedRoutes = [
    "about",
    "contact",
    "item",
    "items",
    "products",
    "services",
  ];

  const currentCity =
    pathParts[0] && !reservedRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const formatCity = (name = "") =>
    name
      .split("-")
      .map(
        (w) =>
          w.charAt(0).toUpperCase() + w.slice(1)
      )
      .join(" ");

  const cityName = formatCity(currentCity);

  useEffect(() => {
    const checkCity = async () => {
      if (!currentCity) {
        setValidCity("");
        setStateName("");
        return;
      }

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "globalbiomedicalorg",
            "districts",
            currentCity.toLowerCase()
          )
        );

        if (snap.exists()) {
          setValidCity(formatCity(currentCity));
          setStateName(snap.data()?.state || "");
        } else {
          setValidCity("");
          setStateName("");
        }
      } catch (err) {
        console.log(err);
        setValidCity("");
        setStateName("");
      }
    };

    checkCity();
  }, [currentCity]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    const { name, email, phone, message } = form;

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      return toast.error("Please fill all fields");
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return toast.error("Please enter a valid 10 digit mobile number");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    try {
      await addDoc(
        collection(db, "websitesQueries", "globalbiomedicalsin", "contactQueries"),
        {
          ...form,
          createdAt: serverTimestamp()
        }
      );

      toast.success("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="contact-page">
      <Toaster position="top-right" />

      {/* HERO */}
      <section className="contact-hero text-center py-5" style={{ background: "linear-gradient(135deg, #eefaf3, #f8fdfb)" }}>
        <div className="container py-4">
          <h1 className="fw-bold display-4 text-dark">
            Contact <span className="text-success">Global Biomedical LLP</span>
          </h1>
          <p className="mt-3 text-secondary lead">
            Get in touch with our expert team for medical & laboratory equipment inquiries
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">

            {/* LEFT CONTACT CARDS */}
            <div className="col-lg-5">
              <h4 className="fw-bold mb-3 text-dark">Get In Touch</h4>
              <p className="text-muted mb-4">
                We are available to assist you with sales, technical support, and product catalogs.
              </p>

              {/* 3 PHONE NUMBERS CARDS */}
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h6 className="fw-bold text-success mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-telephone-fill"></i>
                  Direct Phone & Helpline Numbers
                </h6>
                <div className="d-flex flex-column gap-3">
                  {phoneNumbers.map((p, idx) => (
                    <div key={idx} className="d-flex align-items-center justify-content-between p-2 rounded border bg-light-subtle">
                      <div>
                        <strong className="d-block text-dark">{p.formatted}</strong>
                        <small className="text-muted">{p.label}</small>
                      </div>
                      <div className="d-flex gap-2">
                        <a
                          href={`https://wa.me/91${p.number}?text=Hello%20Global%20Biomedical%20LLP`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-success text-white"
                          title="WhatsApp Chat"
                        >
                          <i className="bi bi-whatsapp"></i>
                        </a>
                        <a
                          href={`tel:+91${p.number}`}
                          className="btn btn-sm btn-outline-success"
                          title="Call"
                        >
                          <i className="bi bi-telephone"></i>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DOWNLOAD PDF BROCHURE BUTTON */}
              <a
                href="/products"
                className="btn btn-danger w-100 py-3 rounded-4 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mb-4 text-white text-decoration-none"
              >
                <i className="bi bi-file-earmark-pdf-fill fs-5"></i>
                <span>Explore Products Catalog (PDF)</span>
              </a>

              {/* LOCATION & EMAIL INFO */}
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <div className="d-flex gap-3 align-items-start mb-3">
                  <div className="bg-success-subtle text-success p-2.5 rounded-3">
                    <i className="bi bi-geo-alt-fill fs-4"></i>
                  </div>
                  <div>
                    <strong className="d-block text-dark">Office Location</strong>
                    <span className="text-secondary small">
                      {validCity && validCity.toLowerCase() !== "jaipur"
                        ? stateName
                          ? `${validCity}, ${stateName}, India`
                          : `${validCity}, India`
                        : "Amrapali Circle, Vaishali Nagar, Jaipur, Rajasthan - 302021"}
                    </span>
                  </div>
                </div>

                <div className="d-flex gap-3 align-items-start">
                  <div className="bg-success-subtle text-success p-2.5 rounded-3">
                    <i className="bi bi-envelope-fill fs-4"></i>
                  </div>
                  <div>
                    <strong className="d-block text-dark">Email Support</strong>
                    <span className="text-secondary small">info@globalbiomedicals.in</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CONTACT FORM */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
                <h4 className="fw-bold mb-4 text-dark">Send Us a Message</h4>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter full name"
                      className="form-control py-2.5 rounded-3"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      className="form-control py-2.5 rounded-3"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      maxLength={10}
                      placeholder="10 digit mobile number"
                      className="form-control py-2.5 rounded-3"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value.replace(/\D/g, "")
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Subject / Equipment Needed</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="e.g. ICU Monitor / Reagents"
                      className="form-control py-2.5 rounded-3"
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-secondary">Your Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      className="form-control rounded-3"
                      placeholder="Write your requirement or questions here..."
                      value={form.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      type="button"
                      className="btn btn-success w-100 py-3 rounded-3 fw-bold shadow-sm"
                      onClick={handleSubmit}
                    >
                      Submit Inquiry
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="map-section no-print">
        <div className="container-fluid p-0">
          <iframe
            src={`https://maps.google.com/maps?q=${
              validCity
                ? stateName
                  ? `${validCity}, ${stateName}, India`
                  : `${validCity}, India`
                : "Amrapali Circle, Vaishali Nagar, Jaipur, India, 302021"
            }&output=embed`}
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}