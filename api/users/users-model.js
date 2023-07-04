const db = require("../../data/db-config.js");
/**
  tüm kullanıcıları içeren bir DİZİ ye çözümlenir, tüm kullanıcılar { user_id, username } içerir
 */
function bul() {
  return db("users");
}

/**
  verilen filtreye sahip tüm kullanıcıları içeren bir DİZİ ye çözümlenir
 */
function goreBul(filtre) {
  return db("users").where(filtre);
}

/**
  verilen user_id li kullanıcıya çözümlenir, kullanıcı { user_id, username } içerir
 */
function idyeGoreBul(user_id) {
  return db.select("user_id", "username").from("users").where({ user_id }).first();
}

/**
  yeni eklenen kullanıcıya çözümlenir { user_id, username }
 */
function ekle(user) {
  return db("users")
    .insert(user)
    .then(([user_id]) => idyeGoreBul(user_id));
}

// Diğer modüllerde kullanılabilmesi için fonksiyonları "exports" nesnesine eklemeyi unutmayın.

module.exports = { bul, goreBul, idyeGoreBul, ekle };
