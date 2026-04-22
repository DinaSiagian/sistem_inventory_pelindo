const fs = require('fs');
let content = fs.readFileSync('c:/sistem_inventory_pelindo/inventory-app/src/components/UserManagement.jsx', 'utf8');

const targetStr = `<EntitySection entityList={entityList} setEntityList={setEntityList} />
        <div style={{ marginTop: ".6rem" }}>
          <BranchSection`;

const replaceStr = `<EntitySection entityList={entityList} setEntityList={setEntityList} />
        <div style={{ marginTop: ".6rem" }}>
          <RoleSection roleList={roleList} setRoleList={setRoleList} />
        </div>
        <div style={{ marginTop: ".6rem" }}>
          <BranchSection`;

content = content.replace(targetStr, replaceStr);
fs.writeFileSync('c:/sistem_inventory_pelindo/inventory-app/src/components/UserManagement.jsx', content);
