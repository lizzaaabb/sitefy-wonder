# Sitefy — landing

```
npm install
npm run dev      # http://localhost:3000
```

## სტრუქტურა

```
src/
  app/
    layout.js        ფონტები (Montserrat, Noto Kufi Arabic, Cormorant) + ენის Provider
    page.js          გვერდი ზემოდან ქვემოთ: Header, Landing, Brands, Vs, Experience, Contact
    globals.css      საერთო სტილი + FiraGO ფონტი
  components/
    Header/          ზედა ზოლი: „ვიღებთ ახალ პროექტებს“, ენის გადამრთველი, დარეკვა
      Header.jsx  Header.css  LanguageSwitcher.jsx
    Landing/         პირველი ეკრანი: ფონი, ლოგო, სათაური
      Landing.jsx  Landing.css
    Brands/          კლიენტების ბრენდების ხაზი
      Brands.jsx  Brands.css
    Vs/              „ჩვეულებრივი vs Sitefy“ — გადასაწევი ხაზით
      Vs.jsx  Vs.css
    Experience/      „რას იგრძნობს შენი მომხმარებელი“ — ტალღა 3 წერტილით
      Experience.jsx  Experience.css
    Contact/         ტელეფონი, WhatsApp, ელფოსტა, სოციალური ქსელები (Footer მის ბოლოშია)
      Contact.jsx  Contact.css  Icon.jsx
    Footer/          SITEFY · პარტნიორები · ©
      Footer.jsx  Footer.css
    SitefyMark/      „S“ ლოგო (SVG)
  i18n/
    translations.js  ყველა ტექსტი 3 ენაზე (ka / en / ar)
  config/
    site.js          ტელეფონი, WhatsApp, ელფოსტა, სოციალური ბმულები — ერთ ადგილას
  hooks/
    useInView.js     სექციის ანიმაცია იწყება, როცა ეკრანზე გამოჩნდება
public/
  images/            landing-bg.jpg, vs-aurelia.jpg, vs-aurelia-mobile.jpg
  fonts/             FiraGO (ქართული + ლათინური)
```

- ტექსტის შეცვლა → `src/i18n/translations.js`
- ტელეფონის / ბმულების შეცვლა → `src/config/site.js`
- თითო სექციის სტილი → მისივე საქაღალდის `.css` ფაილი (კლასები იწყება სექციის სახელით: `.vs-…`, `.contact-…`)
