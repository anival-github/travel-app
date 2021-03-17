import React from 'react';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="wrapper">
      <div className="footer__container">
        <ul className="footer__container-link">
          <li><a href="https://github.com/anival-github">anival-github</a></li>
          <li><a href="https://github.com/dzianisshupenka">dzianisshupenka</a></li>
          <li><a href="https://github.com/thrvrce">thrvrce</a></li>
          <li><a href="https://github.com/DittmerOk">DittmerOk</a></li>
        </ul>
        <div>made in 2021</div>
        <a href="https://rs.school/js/"><img src="https://rs.school/images/rs_school_js.svg" width="80" height="80" alt="Logokurs" /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
