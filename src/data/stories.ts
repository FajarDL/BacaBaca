import type { Story } from '../types';

export const INITIAL_STORIES: Story[] = [
  {
    id: 'secangkir-kopi-dan-waktu',
    title: 'Secangkir Kopi dan Waktu yang Hilang',
    author: 'Ahmad R.',
    coverEmoji: '☕',
    coverGradient: 'from-amber-700 to-yellow-800',
    category: 'Filosofis',
    readingTimeMinutes: 3,
    difficulty: 'Mudah',
    summary: 'Seorang arsitek yang selalu terburu-buru mampir ke sebuah kedai kopi tersembunyi, di mana waktu seolah berjalan lebih lambat.',
    moralLesson: 'Ketenangan bukanlah saat dunia berhenti berputar, melainkan saat kita memberi ruang bagi jiwa untuk bernapas.',
    chapters: [
      {
        id: 'c1',
        title: 'Lonceng Berdenting di Sudut Kota',
        paragraphs: [
          'Hujan baru saja reda ketika Rayyan melangkah tergesa menembus trotoar basah. Jam tangannya menunjukkan pukul lima sore, dan daftar tugas di ponselnya masih berderet panjang tak kunjung usai.',
          'Tanpa sengaja, matanya menangkap sebuah plang kayu lapuk bertuliskan "Kedai Teduh". Aromanya bukan hanya biji kopi yang dipanggang sempurna, melainkan juga wangi kayu manis dan kertas buku tua yang menenangkan.',
          'Di balik meja kasir berdiri seorang pria paruh baya bernama Pak Danu. Senyumnya ramah tanpa terburu-buru, sangat kontras dengan napas Rayyan yang masih terengah-engah.',
          '"Secangkir kopi hitam, cepat ya Pak. Saya harus mengejar kereta," ujar Rayyan sambil melirik jam tangan pintarnya untuk yang kelima kali dalam semenit.'
        ]
      },
      {
        id: 'c2',
        title: 'Tiga Menit yang Berharga',
        paragraphs: [
          'Pak Danu hanya tersenyum tipis. Alih-alih menyalakan mesin espresso bertekanan tinggi, ia mengambil corong seduh manual berbahan keramik dan mulai menimbang biji kopi perlahan.',
          '"Anak muda," kata Pak Danu lembut, air panas mulai ia tuangkan dalam lingkaran-lingkaran lambat, "kopi yang baik membutuhkan waktu untuk mekar. Jika kita memaksanya cepat, kita hanya akan mengecap kepahitan tanpa pernah mengenal rasa manis aslinya."',
          'Rayyan tertegun. Gerakan tangan Pak Danu begitu berirama, seolah waktu di dalam ruangan kecil ini melambat sepuluh kali lipat. Uap hangat mengepul lembut ke udara, membawa aroma cokelat pekat dan rempah.',
          '"Terkadang," lanjut Pak Danu seraya meletakkan cangkir porselen di hadapan Rayyan, "kita terlalu sibuk berlari mengejar masa depan sampai lupa bahwa kita hanya hidup di detik yang sedang kita hirup ini."'
        ]
      },
      {
        id: 'c3',
        title: 'Merasakan yang Nyata',
        paragraphs: [
          'Rayyan menarik napas dalam. Untuk pertama kalinya dalam bertahun-tahun, ia menaruh ponselnya di dalam saku dan memegang cangkir dengan kedua belah tangannya yang hangat.',
          'Tegukan pertama terasa lembut dan kaya. Tidak ada rasa asam yang menusuk, hanya kehangatan yang merambat hingga ke dadanya yang tegang.',
          'Ia memandang ke luar jendela kedai, memperhatikan rintik air yang masih menetes dari dedaunan di tepian jalan. Dunia di luar sana tetap berputar cepat, namun di dalam dirinya, badai itu perlahan reda.',
          'Kereta pukul lima mungkin telah lewat, namun untuk pertama kalinya hari itu, Rayyan merasa tidak kehilangan apa pun.'
        ]
      }
    ],
    reflections: [
      {
        id: 'q1',
        question: 'Apa pesan utama yang ingin disampaikan Pak Danu melalui cara ia menyeduh kopi?',
        options: [
          'Bahwa mesin espresso modern selalu lebih buruk daripada seduh manual.',
          'Bahwa hal-hal berharga dalam hidup butuh kesabaran dan hadir seutuhnya di saat ini.',
          'Bahwa kopi manis lebih disukai daripada kopi pahit.',
          'Bahwa kita sebaiknya tidak perlu mengejar kereta sama sekali.'
        ],
        correctIndex: 1,
        explanation: 'Pak Danu mengajarkan bahwa proses yang dinikmati dengan kesadaran penuh menghasilkan kedalaman rasa dan kedamaian batin.',
        thoughtPrompt: 'Kapan terakhir kali Anda melakukan sesuatu tanpa terburu-buru?'
      }
    ]
  },
  {
    id: 'mercusuar-di-ujung-samudra',
    title: 'Mercusuar di Ujung Samudra',
    author: 'Citra Permata',
    coverEmoji: '🌊',
    coverGradient: 'from-blue-700 to-indigo-900',
    category: 'Petualangan',
    readingTimeMinutes: 4,
    difficulty: 'Menengah',
    summary: 'Di sebuah pulau karang terpencil, seorang pemuda menemukan bahwa cahaya mercusuar bukan sekadar penerang jalan, tetapi penjaga harapan.',
    moralLesson: 'Cahaya sekecil apa pun di tengah kegelapan memiliki kekuatan untuk menuntun mereka yang tersesat.',
    chapters: [
      {
        id: 'c1',
        title: 'Menara di Atas Karang Hitam',
        paragraphs: [
          'Pulau Karang Hitam hanyalah seonggok batu terjal di tengah Laut Selatan, namun di puncaknya berdiri tegak mercusuar batu putih yang telah berusia lebih dari satu abad.',
          'Gilang bertugas di sana menggantikan kakeknya. Setiap petang, tugasnya adalah membersihkan lensa prisma kaca raksasa dan memastikan lentera menyala tepat saat sang surya mencium garis cakrawala.',
          'Banyak temannya mengira pekerjaan ini membosankan dan kesepian. Namun bagi Gilang, deburan ombak yang membentur tebing karang dan hamparan bintang di malam hari adalah simfoni terbaik yang pernah ia miliki.',
          'Suatu malam di musim pancaroba, kabut tebal turun bergulung-gulung menutupi permukaan laut seperti selimut wol kelabu. Radio navigasi mendadak hening karena gangguan badai magnetik.'
        ]
      },
      {
        id: 'c2',
        title: 'Cahaya yang Menembus Kabut',
        paragraphs: [
          'Dari kejauhan, sayup-sayup terdengar bunyi klakson kapal nelayan. Bunyinya terputus-putus dan panik; pertanda bahwa perahu itu telah kehilangan arah dan semakin mendekati karang-karang tajam yang tersembunyi di bawah riak ombak.',
          'Gilang tahu ia tidak punya waktu untuk ragu. Ia menaiki tangga spiral mercusuar bertingkat sembilan dengan gesit. Napasnya memburu, namun tangannya mantap.',
          'Ia memutar tuas pemutar prisma manual sekuat tenaga. Berkas cahaya kuning keemasan yang tajam menyapu menembus pekatnya kabut malam, membelah kegelapan seperti pedang cahaya.',
          'Satu putaran, dua putaran... Tepat di hadapan tebing barat, cahaya itu menyinari siluet perahu kayu yang hanya berjarak lima puluh meter dari deretan karang tajam.'
        ]
      },
      {
        id: 'c3',
        title: 'Kembali Menemukan Pelabuhan',
        paragraphs: [
          'Melihat pendar mercusuar yang memandu jalan, nakhoda perahu segera memutar haluan ke arah laut yang lebih tenang dan menjauh dari jebakan tebing karang.',
          'Klakson perahu berbunyi tiga kali pendek—sebuah bahasa isyarat kuno pelaut yang berarti "Terima kasih, kawan."',
          'Gilang bersandar di pagar balkon besi menara, membiarkan angin laut yang sejuk membelai wajahnya. Di bawah sana, lautan luas tetap liar dan misterius, namun malam itu, satu nyawa dan harapan telah diselamatkan.',
          '"Kita tidak perlu menjadi matahari untuk seluruh alam," bisik Gilang pelan menatap lentera menara. "Cukup menjadi seberkas cahaya yang setia menyala di tempat kita berada."'
        ]
      }
    ],
    reflections: [
      {
        id: 'q1',
        question: 'Apa arti bunyi klakson tiga kali pendek yang ditiupkan oleh kapal nelayan?',
        options: [
          'Peringatan bahwa badai akan datang.',
          'Tanda bahwa mesin kapal rusak.',
          'Ucapan terima kasih dari pelaut karena telah dipandu dengan selamat.',
          'Panggilan meminta pasokan makanan.'
        ],
        correctIndex: 2,
        explanation: 'Tiga klakson pendek adalah isyarat laut tradisional sebagai ungkapan terima kasih kepada mercusuar.',
        thoughtPrompt: 'Siapakah orang yang pernah menjadi "mercusuar" penuntun dalam hidup Anda?'
      }
    ]
  },
  {
    id: 'malam-ketika-hutan-lupa-bernyanyi',
    title: 'Malam Ketika Hutan Lupa Bernyanyi',
    author: 'Dewi Anggraini',
    coverEmoji: '🦉',
    coverGradient: 'from-emerald-800 to-teal-950',
    category: 'Fabel & Dongeng',
    readingTimeMinutes: 3,
    difficulty: 'Mudah',
    summary: 'Kisah seekor burung hantu tua dan kunang-kunang pemalu yang mengembalikan keharmonisan suara hutan rimba.',
    moralLesson: 'Setiap suara, betapa pun kecilnya, memiliki nada penting dalam indahnya harmoni kehidupan.',
    chapters: [
      {
        id: 'c1',
        title: 'Kesunyian yang Mengganjal',
        paragraphs: [
          'Hutan Lumut biasanya tidak pernah sepi. Saat matahari terbenam, jangkrik mulai menggesekkan sayapnya, katak pohon bernyanyi bersahut-sahutan, dan daun-daun pinus berbisik ditiup angin lembut.',
          'Namun malam itu, keheningan aneh menyelimuti rimba. Tidak ada nyanyian, tidak ada gesekan sayap, bahkan angin seolah menahan napasnya di balik dahan-dahan tua.',
          'Pak Moko, burung hantu bertanduk yang bijaksana, membuka kelopak matanya yang bulat besar. Ia melompat ke dahan terendah dan memandang ke bawah.',
          'Di atas sehelai daun pakis, duduk seekor jangkrik muda yang menundukkan kepalanya dalam-dalam. Di sebelahnya, katak-katak hijau hanya saling tatap tanpa bersuara.'
        ]
      },
      {
        id: 'c2',
        title: 'Rasa Cemas yang Mengunci Nada',
        paragraphs: [
          '"Mengapa hutan ini terasa seperti gua kosong tanpa suara?" tanya Pak Moko dengan suara dalamnya yang hangat.',
          'Si jangkrik menjawab pelan, "Tadi sore, kawanan burung merak datang dan menertawakan suara kami. Mereka bilang suara jangkrik cempreng dan suara katak memekakkan telinga. Kami merasa suara kami hanya mengotori hutan, jadi kami memilih diam."',
          'Pak Moko menghela napas panjang. Dari balik rumpun bambu, seekor kunang-kunang kecil bernama Binar terbang mendekat. Cahayanya berkedip redup dan ragu-ragu.',
          '"Aku juga takut menyala, Pak Moko," bisik Binar. "Cahayaku terlalu kecil dibandingkan bulan purnama yang megah di langit sana."'
        ]
      },
      {
        id: 'c3',
        title: 'Simfoni yang Sebenarnya',
        paragraphs: [
          'Pak Moko tersenyum lembut. Ia mengepakkan sayap lebarnya perlahan tanpa menimbulkan suara, lalu menatap mereka satu per satu.',
          '"Tahukah kalian mengapa hutan ini begitu indah?" tanya Pak Moko. "Bukan karena suara merak yang anggun saja. Hutan ini hidup karena ada derik jangkrik yang menjaga malam, suara katak yang menyambut hujan, dan kerlip kunang-kunang yang menemani mereka yang tersesat di semak gelap."',
          '"Bulan tidak pernah meminta kunang-kunang padam. Hutan tidak akan pernah menjadi orkestra jika semua instrumennya adalah seruling yang sama."',
          'Binar mulai berkedip lebih terang. Jangkrik menarik napas dan mencoba menggesek sayapnya satu kali—kriik... kriik. Katak menyambut dengan denting nada rendah yang mantap. Malam itu, Hutan Lumut kembali bernyanyi, lebih merdu dan penuh syukur daripada sebelumnya.'
        ]
      }
    ],
    reflections: [
      {
        id: 'q1',
        question: 'Mengapa penghuni hutan sebelumnya memilih untuk tidak bersuara?',
        options: [
          'Karena mereka sedang mengantuk dan ingin tidur lebih cepat.',
          'Karena takut diserang predator yang sedang lewat.',
          'Karena merasa minder dan tidak berharga setelah diejek oleh kawanan lain.',
          'Karena ada larangan bersuara dari raja hutan.'
        ],
        correctIndex: 2,
        explanation: 'Mereka merasa ragu pada kemampuan sendiri akibat perbandingan dan komentar yang menjatuhkan rasa percaya diri.',
        thoughtPrompt: 'Pernahkah Anda menahan kelebihan diri hanya karena merasa tidak sebaik orang lain?'
      }
    ]
  },
  {
    id: 'bintang-jatuh-di-halaman-belakang',
    title: 'Bintang Jatuh di Halaman Belakang',
    author: 'Nadia Sastrowardoyo',
    coverEmoji: '✨',
    coverGradient: 'from-violet-800 to-purple-950',
    category: 'Inspirasi',
    readingTimeMinutes: 3,
    difficulty: 'Mudah',
    summary: 'Kisah percakapan hangat antara Nenek Maya dan cucunya tentang cara menemukan keajaiban dalam rutinitas sehari-hari.',
    moralLesson: 'Keajaiban bukanlah peristiwa langka di langit jauh, melainkan kebaikan kecil yang kita lakukan dengan tulus setiap hari.',
    chapters: [
      {
        id: 'c1',
        title: 'Tenda Sederhana di Bawah Langit',
        paragraphs: [
          'Malam liburan sekolah selalu menjadi waktu yang paling ditunggu oleh Tara. Di halaman belakang rumah Nenek Maya yang asri, mereka mendirikan tenda kecil beralaskan tikar pandan.',
          'Di atas meja kayu terhidang sepiring pisang goreng hangat dan teh serai beraroma manis. Angin malam berhembus lembut menggoyangkan dahan pohon mangga.',
          '"Nenek," tanya Tara sambil menengadah memandangi langit yang bertabur bintang, "apakah benar kalau kita melihat bintang jatuh dan berdoa, permintaan kita pasti terkabul?"',
          'Nenek Maya tertawa kecil, suara tawanya selalu terdengar seperti gemerincing loncing angin tembaga.'
        ]
      },
      {
        id: 'c2',
        title: 'Bintang yang Tak Pernah Jatuh',
        paragraphs: [
          '"Orang-orang kuno percaya begitu, sayang," jawab Nenek seraya membelai rambut Tara. "Tapi Nenek rasa, kita sering terlalu sibuk menatap ke atas menunggu satu bintang jatuh, sampai lupa pada ribuan bintang yang tetap setia bersinar di atas kepala kita."',
          'Tara mengerutkan keningnya, mencoba memahami perkataan neneknya yang terdengar seperti teka-teki.',
          '"Lihat tanaman melati di sampingmu itu," tunjuk Nenek. "Setiap pagi ia mekar tanpa menuntut tepuk tangan. Lihat ayahmu yang setiap hari bangun subuh menyiapkan sarapan untukmu. Mereka semua adalah bintang-bintang yang tidak pernah jatuh, tapi selalu menerangi harimu."'
        ]
      },
      {
        id: 'c3',
        title: 'Doa yang Sebenarnya',
        paragraphs: [
          'Tara memandang kuntum bunga melati yang putih bersih di sudut halaman. Wanginya lembut menembus udara malam.',
          'Tepat saat itu, seberkas garis cahaya perak meluncur cepat melintasi langit timur—bintang jatuh yang sesungguhnya.',
          '"Tara, cepat pejamkan mata dan minta permohonan!" seru Nenek berbisik gembira.',
          'Tara tersenyum, menutup matanya sejenak, lalu membukanya kembali. "Aku sudah berdoa, Nek. Aku tidak meminta mainan baru atau terbang ke bulan. Aku hanya berterima kasih karena malam ini bisa duduk di sini bersama Nenek."'
        ]
      }
    ],
    reflections: [
      {
        id: 'q1',
        question: 'Apa arti "bintang yang tak pernah jatuh" menurut Nenek Maya?',
        options: [
          'Bintang buatan yang dipasang di atap rumah.',
          'Orang-orang dan hal-hal sederhana yang setiap hari setia memberi kebaikan tanpa kita sadari.',
          'Satelit buatan yang mengorbit bumi.',
          'Koleksi lampu taman yang menyala semalaman.'
        ],
        correctIndex: 1,
        explanation: 'Nenek mengingatkan bahwa hal paling berharga sering kali adalah rutinitas kasih sayang yang hadir setiap hari.',
        thoughtPrompt: 'Sebutkan 3 hal kecil hari ini yang membuat Anda merasa bersyukur.'
      }
    ]
  },
  {
    id: 'rahasia-jam-pasir-kayu-jati',
    title: 'Rahasia Jam Pasir Kayu Jati',
    author: 'Bambang Sudiro',
    coverEmoji: '⏳',
    coverGradient: 'from-amber-800 to-stone-900',
    category: 'Sains & Alam',
    readingTimeMinutes: 4,
    difficulty: 'Menengah',
    summary: 'Seorang pembuat jam mekanik menemukan bahwa butiran pasir terbaik untuk mengukur waktu bukan berasal dari pantai, melainkan dari sisa kenangan berharga.',
    moralLesson: 'Waktu bukanlah musuh yang harus dikalahkan, melainkan kanvas yang menunggu untuk kita warnai dengan makna.',
    chapters: [
      {
        id: 'c1',
        title: 'Bengkel di Loteng Tua',
        paragraphs: [
          'Bengkel kerja Kakek Warsito dipenuhi oleh detak ratusan jam. Ada jam bandul setinggi lemari, jam saku perak dengan ukiran dedaunan, hingga jam burung kukuk yang bersuara setiap jam genap.',
          'Namun di tengah semua mesin presisi itu, benda yang paling dijaga oleh Kakek Warsito adalah sebuah jam pasir sederhana berbingkai kayu jati tua.',
          'Alif, cucunya yang gemar mempelajari sains dan teknologi modern, sering heran melihat kakeknya berlama-lama memandangi jam pasir itu.',
          '"Kek, jam pasir ini kan tidak akurat," ujar Alif suatu siang. "Sekarang jam atom digital di ponselku bisa menghitung sepersekian miliar detik tanpa meleset sedikit pun."'
        ]
      },
      {
        id: 'c2',
        title: 'Butiran-Butiran Makna',
        paragraphs: [
          'Kakek Warsito tertawa hangat. Jemarinya yang berkerut dan bernoda minyak mesin membelai tabung kaca yang bening itu.',
          '"Jam digitalmu memang sangat pintar menghitung detik, Alif," jawab kakek lembut. "Tapi ia tidak bisa memberitahumu apakah detik yang barusan lewat itu terasa berharga atau hampa."',
          'Kakek membalik jam pasir tersebut. Butiran pasir keemasan mulai mengalir lembut ke bawah, seperti air terjun mini yang tidak bersuara.',
          '"Pasir di dalam sini diambil dari pantai tempat Kakek pertama kali mengajak nenekmu berjalan sore lima puluh tahun lalu. Setiap kali Kakek membaliknya, Kakek tidak sedang melihat waktu berkurang. Kakek sedang melihat bukti bahwa waktu yang diisi cinta tidak akan pernah benar-benar hilang."'
        ]
      },
      {
        id: 'c3',
        title: 'Mengisi Detik dengan Rasa',
        paragraphs: [
          'Alif terdiam memandangi aliran pasir halus yang terus jatuh satu demi satu. Tak ada alarm keras, tak ada angka digital yang berkedip menuntut urgensi.',
          'Ia menyadari bahwa sering kali ia panik melihat waktu berjalan cepat, padahal ia sendiri yang membiarkan waktunya terbuang untuk menatap layar ponsel tanpa arah.',
          '"Ingat ini, Alif," bisik Kakek seraya menepuk bahu cucunya. "Jam mekanik dibuat manusia untuk mengatur jadwal kerja, tetapi waktu itu sendiri diciptakan Tuhan agar kita bisa saling mengasihi, belajar, dan meninggalkan jejak kebaikan."',
          'Mulai hari itu, di samping laptop canggihnya, Alif selalu meletakkan sebuah jam pasir kecil—bukan untuk mengukur seberapa cepat ia bekerja, melainkan untuk mengingatkannya agar selalu hadir dengan sepenuh hati.'
        ]
      }
    ],
    reflections: [
      {
        id: 'q1',
        question: 'Apa perbedaan sudut pandang antara jam digital Alif dan jam pasir Kakek Warsito?',
        options: [
          'Jam pasir lebih mahal daripada jam digital.',
          'Jam digital hanya menghitung kuantitas detik, sedangkan jam pasir mengingatkan tentang kualitas dan makna dari waktu yang dijalani.',
          'Jam digital tidak bisa digunakan saat baterai habis.',
          'Jam pasir lebih mudah dibawa bepergian.'
        ],
        correctIndex: 1,
        explanation: 'Kakek mengajarkan bahwa esensi waktu bukan pada hitungan angka, melainkan pada apa yang kita lakukan dan rasakan di setiap detik hidup kita.',
        thoughtPrompt: 'Apa kegiatan yang membuat Anda merasa waktu berjalan lambat dan penuh kedamaian?'
      }
    ]
  },
  {
    id: 'rangkuman-revou-product-mindset',
    title: 'Rangkuman Belajar: Membangun Solusi yang Dicintai Pengguna',
    author: 'Catatan Belajar RevoU',
    coverEmoji: '🚀',
    coverGradient: 'from-blue-600 to-indigo-800',
    category: 'Edukasi & Rangkuman',
    readingTimeMinutes: 4,
    difficulty: 'Menengah',
    summary: 'Sintesis pemahaman mandiri tentang problem framing, data-driven vs data-informed, dan seni melakukan eksperimen cepat tanpa berasumsi.',
    moralLesson: 'Solusi terbaik tidak lahir dari kecanggihan fitur semata, melainkan dari kedalaman empati kita dalam memahami keresahan nyata pengguna.',
    attribution: 'Catatan Belajar Pribadi • Terinspirasi dari Kerangka Kerja Problem Solving & Product Management',
    isCustom: false,
    chapters: [
      {
        id: 'c1',
        title: 'Jatuh Cinta pada Masalah, Bukan Solusinya',
        paragraphs: [
          'Dalam dunia pengembangan produk dan strategi digital, kesalahan paling umum pemula adalah melompat terlalu cepat ke solusi. Sering kali kita membuat aplikasi atau rencana bisnis yang rumit sebelum benar-benar membuktikan apakah ada orang yang membutuhkan hal tersebut.',
          'Prinsip utama yang perlu ditanamkan adalah "Fall in love with the problem, not your solution". Sebelum menulis sebaris kode atau merancang materi presentasi, pastikan kita memahami "Who is the user?", "What is their pain point?", dan "Why does this problem matter now?".',
          'Wawancara pengguna yang berkualitas bukanlah menanyakan "Apakah kamu suka ide saya?", melainkan menggali perilaku nyata mereka di masa lalu: "Bagaimana cara Anda menyelesaikan masalah ini kemarin?". Tindakan masa lalu jauh lebih jujur daripada janji masa depan.'
        ]
      },
      {
        id: 'c2',
        title: 'Data Sebagai Kompas, Intuisi Sebagai Pengemudi',
        paragraphs: [
          'Banyak yang mengira bahwa menjadi seorang profesional berarti harus 100% data-driven. Namun, ada perbedaan halus namun krusial antara "Data-Driven" dan "Data-Informed".',
          'Data-driven murni melihat angka apa adanya tanpa konteks manusiawi. Ini bisa berbahaya karena angka hanya memberitahu "Apa yang terjadi" (What), tetapi tidak selalu menjelaskan "Mengapa itu terjadi" (Why).',
          'Sebagai pembelajar yang bijak, pendekatan data-informed menggabungkan metrik kuantitatif dengan riset kualitatif, etika bisnis, dan empati pengguna. Angka menjadi kompas penunjuk arah, namun pertimbangan manusialah yang memutuskan rute jalan yang bermartabat.'
        ]
      },
      {
        id: 'c3',
        title: 'Eksperimen Cepat dan Refleksi Berkelanjutan',
        paragraphs: [
          'Belajar bukan sekadar menghafal modul atau mencatat istilah asing. Nilai sejati dari ilmu adalah saat ia diuji dalam siklus: Bangun (Build), Ukur (Measure), dan Pelajari (Learn).',
          'Buatlah eksperimen terkecil yang bisa memvalidasi hipotesis Anda. Jika hasil belum sesuai harapan, itu bukan kegagalan diri, melainkan data baru yang menyingkap kebenaran.',
          'Dengan merangkum materi secara berkala dan membacanya kembali dengan tenang di BacaBaca, konsep-konsep abstrak akan mengendap menjadi intuisi praktis yang siap digunakan di dunia kerja nyata.'
        ]
      }
    ],
    reflections: [
      {
        id: 'q1',
        question: 'Mengapa pendekatan "Data-Informed" sering kali lebih holistik daripada sekadar "Data-Driven" murni?',
        options: [
          'Karena data-informed sama sekali tidak memerlukan metrik angka kuantitatif.',
          'Karena data-informed memadukan data kuantitatif dengan empati konteks kualitatif dan etika manusiawi.',
          'Karena data-driven membutuhkan biaya server yang terlalu mahal.',
          'Karena data kualitatif selalu lebih akurat daripada data kuantitatif.'
        ],
        correctIndex: 1,
        explanation: 'Data-informed menyadari keterbatasan angka kuantitatif dan melengkapinya dengan pemahaman mendalam tentang motif, etika, dan konteks pengguna.',
        thoughtPrompt: 'Bagaimana Anda biasanya mengambil keputusan penting: lebih mengandalkan data, intuisi, atau perpaduan keduanya?'
      }
    ]
  }
];

export const INITIAL_BADGES = [
  {
    id: 'first-step',
    title: 'Langkah Pertama',
    description: 'Menyelesaikan bacaan cerita pertamamu di BacaBaca.',
    icon: '🌱',
    unlocked: false
  },
  {
    id: 'zen-reader',
    title: 'Pembaca Zen',
    description: 'Membaca dengan menyalakan suara latar (ambient sound).',
    icon: '🧘',
    unlocked: false
  },
  {
    id: 'streak-3',
    title: 'Konsisten 3 Hari',
    description: 'Membangun kebiasaan membaca 3 hari berturut-turut.',
    icon: '🔥',
    unlocked: false
  },
  {
    id: 'quote-collector',
    title: 'Pemetik Hikmah',
    description: 'Menyimpan kutipan favorit pertamamu ke galeri.',
    icon: '💎',
    unlocked: false
  },
  {
    id: 'all-rounder',
    title: 'Penjelajah Kisah',
    description: 'Membaca cerita dari minimal 3 kategori berbeda.',
    icon: '🧭',
    unlocked: false
  },
  {
    id: 'active-writer',
    title: 'Pena Pembelajar',
    description: 'Membuat atau merangkum bacaan belajar sendiri di BacaBaca.',
    icon: '✍️',
    unlocked: false
  }
];
