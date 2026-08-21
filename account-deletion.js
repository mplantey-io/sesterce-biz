// Sesterce — formulaire de suppression de compte
//
// ⚠️ ENDPOINT À CRÉER CÔTÉ BACKEND
// -----------------------------------------------------------------------
// Ce formulaire poste vers l'endpoint ci-dessous, qui N'EXISTE PAS ENCORE
// côté API Sesterce à ce jour. Le contrat proposé (à valider avec le
// backend Spring Boot) :
//
//   POST https://api.sesterce.app/account/deletion-requests
//   Content-Type: application/json
//
//   Body:
//   {
//     "email": "string (requis)",
//     "accountReference": "string (optionnel, ex. numéro de carte)",
//     "reason": "string (optionnel, une des valeurs du <select>)",
//     "message": "string (optionnel)"
//   }
//
//   Réponses attendues :
//   - 202 Accepted : la demande est enregistrée, un e-mail de confirmation
//     part au destinataire pour vérifier son identité avant traitement.
//   - 4xx/5xx : erreur -> le formulaire bascule sur le repli e-mail ci-dessous.
//
// Tant que l'endpoint n'existe pas, toute tentative de fetch échouera
// (404 ou erreur réseau) et l'utilisateur verra automatiquement le message
// de repli lui proposant d'envoyer sa demande par e-mail à la place, afin
// qu'aucune demande ne soit perdue en attendant l'implémentation réelle.
// -----------------------------------------------------------------------

(function () {
  "use strict";

  var DELETION_API_ENDPOINT = "https://api.sesterce.app/account/deletion-requests";
  var SUPPORT_EMAIL = "contact@sesterce.app";

  var form = document.getElementById("deletion-form");
  if (!form) return;

  var submitBtn = document.getElementById("submit-btn");
  var alertSuccess = document.getElementById("alert-success");
  var alertError = document.getElementById("alert-error");
  var mailtoFallback = document.getElementById("mailto-fallback");

  function hideAlerts() {
    alertSuccess.classList.remove("is-visible");
    alertError.classList.remove("is-visible");
  }

  function buildMailtoLink(data) {
    var subject = "Demande de suppression de compte Sesterce";
    var lines = [
      "Bonjour,",
      "",
      "Je souhaite demander la suppression de mon compte Sesterce et des données associées.",
      "",
      "E-mail du compte : " + data.email,
      data.accountReference ? "Identifiant / numéro de carte : " + data.accountReference : null,
      data.reason ? "Motif : " + data.reason : null,
      data.message ? "Précisions : " + data.message : null,
      "",
      "Merci de confirmer la prise en compte de cette demande."
    ].filter(Boolean).join("\n");

    return (
      "mailto:" + SUPPORT_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines)
    );
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hideAlerts();

    var data = {
      email: form.email.value.trim(),
      accountReference: form.accountRef.value.trim(),
      reason: form.reason.value,
      message: form.message.value.trim()
    };

    if (!data.email || !form.confirm.checked) {
      form.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours…";

    fetch(DELETION_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (!response.ok) throw new Error("API responded with " + response.status);
        alertSuccess.classList.add("is-visible");
        form.reset();
      })
      .catch(function (err) {
        // L'API n'existe pas encore (ou est indisponible) : on ne perd pas
        // la demande de l'utilisateur, on lui propose le repli e-mail.
        console.warn("Deletion API unavailable, falling back to email:", err);
        mailtoFallback.href = buildMailtoLink(data);
        alertError.classList.add("is-visible");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Demander la suppression de mon compte";
      });
  });
})();
