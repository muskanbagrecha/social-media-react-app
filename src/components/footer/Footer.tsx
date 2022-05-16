import { SocialItem } from "./SocialItem";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Made with <span className="code-symbol">&lt; / &gt;</span> by Muskan
        Bagrecha
      </p>
      <ul className="footer__list">
        <SocialItem
          path="https://www.linkedin.com/in/muskan-bagrecha-82bbb8176"
          iconClass="fa fa-linkedin"
        />
        <SocialItem
          path="https://twitter.com/HoejackBorseman"
          iconClass="fa fa-twitter"
        />
        <SocialItem
          path="https://github.com/muskanbagrecha"
          iconClass="fa fa-github"
        />
        <SocialItem
          path="https://www.instagram.com/hoejackborsemaan"
          iconClass="fa fa-instagram"
        />
      </ul>
      <p className="copyright">© Fashgram'22</p>
    </footer>
  );
};

