import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Header.css"

const Header = () => {
  return (
    <header className="header-app">
      <p className="header-title">Controle de Locais de Trabalho</p>
      <div className="header-info">
        <i className="bi bi-house-door header-icon"></i>
        <div className="vertical-border-right" />
        <i className="bi bi-person header-icon"></i>
        <div className="header-user-info">
          <p className="header-username">Usuário</p>
          <p className="header-function">Administrador</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
