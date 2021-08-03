import "../css/SideMenu.css";

const SideMenu = () => {
  return (
    <aside className="sidebar-menu">
      <p className="sidebar-title">
        <i className="bi bi-gear"></i> Administração
      </p>
      <ul className="sidebar-list">
        <li className="sidebar-item">Administradores</li>
        <li className="sidebar-item">Áreas</li>
        <li className="sidebar-item active">Locais de Trabalho</li>
        <li className="sidebar-item">Habilidades</li>
        <li className="sidebar-item">Log</li>
        <li className="sidebar-item">Responsáveis</li>
      </ul>
    </aside>
  );
};

export default SideMenu;
