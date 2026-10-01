import { useEffect, useMemo, useState } from "react";
import { products, categories } from "./data.js";

const npr = (n) => "Rs. " + n.toLocaleString("en-IN");
const load = () => { try { return JSON.parse(localStorage.getItem("rk-cart")) || {}; } catch { return {}; } };

export default function App() {
  const [cart, setCart] = useState(load);            // { [id]: qty }
  const [cartOpen, setCartOpen] = useState(false);
  const [step, setStep] = useState("cart");          // cart | checkout | done
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");
  const [toast, setToast] = useState("");

  useEffect(() => { try { localStorage.setItem("rk-cart", JSON.stringify(cart)); } catch {} }, [cart]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 1800); return () => clearTimeout(t); }, [toast]);

  const list = useMemo(() => {
    let r = products.filter((x) => (cat === "All" || x.category === cat) && x.name.toLowerCase().includes(q.toLowerCase()));
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [cat, q, sort]);

  const items = Object.entries(cart).map(([id, qty]) => ({ ...products.find((p) => p.id === +id), qty }));
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const delivery = subtotal === 0 || subtotal >= 1000 ? 0 : 100;

  const add = (p) => { setCart((c) => ({ ...c, [p.id]: (c[p.id] || 0) + 1 })); setToast(p.name + " added to cart"); };
  const setQty = (id, n) => setCart((c) => { const x = { ...c }; if (n <= 0) delete x[id]; else x[id] = n; return x; });
  const openCart = () => { setStep("cart"); setCartOpen(true); };

  const placeOrder = (e) => { e.preventDefault(); setCart({}); setStep("done"); };

  return (
    <>
      <header className="top">
        
        <nav className="bar wrap">
          <a href="#home" className="brand"><span className="mark">RK</span> R.K. Home Care</a>
          <div className="links">
            <a href="#home">Home</a><a href="#products">Products</a><a href="#about">About</a><a href="#contact">Contact</a>
          </div>
          <button className="cartbtn" onClick={openCart} aria-label="Open cart">Cart <b>{count}</b></button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="wrap heroin">
            <div>
              <h1>Clean. Safe. Protect.</h1>
              <p>Hygiene soaps, homestyle achar and fresh sweets, made in Janakpurdham. Your hygiene is our commitment.</p>
              <a className="btn" href="#products">Shop products</a>
            </div>
            <ul className="trust">
              <li><b>Made locally</b> in Janakpurdham</li>
              <li><b>Pure ingredients</b> traditional recipes</li>
              <li><b>Cash on delivery</b> available</li>
            </ul>
          </div>
        </section>

        <section id="products" className="wrap sec">
          <h2>Our products</h2>
          <div className="tools">
            <div className="tabs">
              {categories.map((c) => (
                <button key={c} className={c === cat ? "on" : ""} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
            <input type="search" placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
              <option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
            </select>
          </div>
          {list.length === 0 && <p className="empty">No products match “{q}”. Try a different search or category.</p>}
          <div className="grid">
            {list.map((p) => (
              <article key={p.id} className="card">
                <div className="img" style={{ background: p.tint }} aria-hidden="true">{p.icon}</div>
                <div className="body">
                  <small>{p.category}</small>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="row"><span><b>{npr(p.price)}</b> <small>/ {p.unit}</small></span>
                    <button className="btn sm" onClick={() => add(p)}>Add to cart</button></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="about">
          <div className="wrap sec">
            <h2>About R.K. Home Care International</h2>
            <p>Rooted in Janakpurdham, we bring together household hygiene and authentic homemade flavours. From robust home care solutions to traditional delicacies, quality and safety are at the heart of everything we produce.</p>
            <div className="stats"><div><b>3</b> product lines</div><div><b>18+</b> products</div><div><b>100%</b> quality checked</div></div>
          </div>
        </section>

        <section id="contact" className="wrap sec">
          <h2>Contact us</h2>
          <div className="contact">
            <div>
              <p><b>Headquarters</b><br />Janakpurdham-1, Sita Chowk</p>
              <p><b>Email</b><br /><a href="mailto:info@rkhomecare.com.np">info@rkhomecare.com.np</a></p>
              <p><b>Website</b><br /><a href="https://www.rkhomecare.com.np">www.rkhomecare.com.np</a></p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); e.target.reset(); setToast("Message sent. We will reply soon."); }}>
              <label>Name<input required /></label>
              <label>Email<input type="email" required /></label>
              <label>Message<textarea rows="4" required /></label>
              <button className="btn">Send message</button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <span>© 2026 R.K. Home Care International Pvt. Ltd. All rights reserved.</span>
          <span>“Your Hygiene Is Our Commitment.”</span>
        </div>
      </footer>

      {cartOpen && <div className="shade" onClick={() => setCartOpen(false)} />}
      <aside className={"drawer" + (cartOpen ? " open" : "")} aria-hidden={!cartOpen}>
        <div className="dh"><h3>{step === "checkout" ? "Checkout" : step === "done" ? "Order placed" : "Your cart"}</h3>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart">✕</button></div>

        {step === "done" && (
          <div className="pad"><p>Thank you. Your order is confirmed and we will call you to arrange delivery.</p>
            <button className="btn" onClick={() => setCartOpen(false)}>Continue shopping</button></div>
        )}

        {step === "cart" && (
          <div className="pad">
            {items.length === 0 ? <p className="empty">Your cart is empty. Add a product to get started.</p> : items.map((i) => (
              <div key={i.id} className="line">
                <span className="ic" style={{ background: i.tint }}>{i.icon}</span>
                <div><b>{i.name}</b><small>{npr(i.price)} · {i.unit}</small>
                  <div className="qty"><button onClick={() => setQty(i.id, i.qty - 1)}>−</button><span>{i.qty}</span><button onClick={() => setQty(i.id, i.qty + 1)}>+</button>
                    <button className="link" onClick={() => setQty(i.id, 0)}>Remove</button></div></div>
                <b>{npr(i.price * i.qty)}</b>
              </div>
            ))}
            {items.length > 0 && <Totals subtotal={subtotal} delivery={delivery} />}
            {items.length > 0 && <button className="btn full" onClick={() => setStep("checkout")}>Proceed to checkout</button>}
          </div>
        )}

        {step === "checkout" && (
          <form className="pad" onSubmit={placeOrder}>
            <label>Full name<input required /></label>
            <label>Phone<input type="tel" required /></label>
            <label>Delivery address<textarea rows="3" required /></label>
            <label>Payment<select><option>Cash on delivery</option><option>eSewa (pay on confirmation)</option><option>Khalti (pay on confirmation)</option></select></label>
            <Totals subtotal={subtotal} delivery={delivery} />
            <button className="btn full">Place order</button>
            <button type="button" className="link" onClick={() => setStep("cart")}>Back to cart</button>
          </form>
        )}
      </aside>
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}

function Totals({ subtotal, delivery }) {
  return (
    <dl className="tot">
      <dt>Subtotal</dt><dd>{npr(subtotal)}</dd>
      <dt>Delivery</dt><dd>{delivery ? npr(delivery) : "Free"}</dd>
      <dt className="g">Total</dt><dd className="g">{npr(subtotal + delivery)}</dd>
    </dl>
  );
}
