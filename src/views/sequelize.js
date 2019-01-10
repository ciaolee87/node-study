[].forEach.call(document.querySelectorAll('#user-list tr'), function (el) {
   el.addEventListener('click', function () {
       var id = el.querySelector('td').textContent;
       getCommnet(id);
   });
});