import React from "react";
import { getSession } from "next-auth/client";

const index = () => {
  return (
    <div className="layout">
      <main>
        <h1>Hello World</h1>
        <h2>Hello World</h2>
        <h3>Hello World</h3>
        <h4>Hello World</h4>
        <h5>Hello World</h5>
        <h6>Hello World</h6>

        <blockquote>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. In
          hendrerit gravida rutrum quisque. Tempus imperdiet nulla malesuada
          pellentesque elit eget gravida cum. Sit amet consectetur adipiscing
          elit ut aliquam purus. Id nibh tortor id aliquet lectus proin nibh.
          Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Nam
          aliquam sem et tortor consequat id porta nibh venenatis. Neque laoreet
          suspendisse interdum consectetur libero id faucibus. Sit amet
          consectetur adipiscing elit duis. Pellentesque elit ullamcorper
          dignissim cras tincidunt. Magna sit amet purus gravida quis blandit
          turpis. Risus viverra adipiscing at in tellus integer feugiat
          scelerisque varius. Amet consectetur adipiscing elit ut. Augue
          interdum velit euismod in pellentesque massa placerat duis ultricies.
          Sit amet justo donec enim diam vulputate ut. Sagittis vitae et leo
          duis ut diam quam. Magna sit amet purus gravida. Dolor morbi non arcu
          risus quis. Et ligula ullamcorper malesuada proin. Nam libero justo
          laoreet sit amet. Gravida dictum fusce ut placerat.
        </blockquote>
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input type="username" placeholder="exampleUser" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='i.e. "password123"' />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="test@example.com" />
          </div>
          <button>Submit</button>
          <button className="cancel">Cancel</button>
          <button>This Way &#x27F6;</button>
          <button disabled>I'm Disabled</button>
        </form>
      </main>
    </div>
  );
};

export default index;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return {};
  }

  return {
    props: {
      user: session.user,
    },
  };
}
