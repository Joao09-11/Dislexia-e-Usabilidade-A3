// BANCO DE DADOS
 
const CATALOGO_LIVROS = [
    {id: 1, titulo: "1984", autor: "George Orwell", ano: 1949, genero: "Ficção", capa: "IMG/ficcao/1984.jpeg" },
    {id: 2, titulo: "A Hora da Estrela", autor: "Clarice Lispector", ano: 1977, genero: "Clássicos", capa: "IMG/classicos/aHoraDaEstrela.jpeg" },
    {id: 3, titulo: "Futuro", autor: "Ailton Krenak", ano: 2022, genero: "Filosofia", capa: "IMG/filosofia/futuroAncestral.jpeg" },
    {id: 4, titulo: "A Revolution dos Bichos", autor: "George Orwell", ano: 1945, genero: "Ficção", capa: "IMG/ficcao/aRevolucaoDosBichos.jpeg" },
    {id: 5, titulo: "O amanhã não está à venda", autor: "Ailton Krenak", ano: 2020, genero: "Filosofia", capa: "IMG/filosofia/oAmanhaNaoEstaAvenda.jpeg" },
    {id: 6, titulo: "O Alienista", autor: "Machado de Assis", ano: 1882, genero: "Clássicos", capa: "IMG/classicos/oAlienista.jpeg" },
    {id: 7, titulo: "Mulheres, cultura e política", autor: "Angela Davis", ano: 1989, genero: "Sociedade", capa: "IMG/sociedade/mulheresCulturaEpolitica.jpeg" },
    {id: 8, titulo: "Não me faça pensar", autor: "Steve Krug", ano: 2000, genero: "Ensino", capa: "IMG/ensino/naoMeFacaPensar.jpeg" },
    {id: 9, titulo: "Edital Concurso 2026", autor: "Documento", ano: 2026, genero: "Documentos", capa: "IMG/documentos/edital.jpeg" },
    {id: 10, titulo: "Livro Didático", autor: "Escolar", ano: 2025, genero: "Documentos", capa: "IMG/documentos/livroEscola.jpeg" },
    {id: 11, titulo: "O Iluminado", autor: "Stephen King", ano: 1977, genero: "Terror", capa: "IMG/terror/oIluminado.jpeg" },
    {id: 12, titulo: "Crepúsculo", autor: "Stephenie Meyer", ano: 2005, genero: "Romance", capa: "IMG/romance/crepusculo.jpeg" },
    {id: 13, titulo: "Tudo sobre o amor", autor: "Bell Hooks", ano: 2000, genero: "Sociedade", capa: "IMG/sociedade/tudoSobreOamor.jpeg" },
    {id: 14, titulo: "ENEM- Ciências da Natureza", autor: "Apostila", ano: 2025, genero: "Ensino", capa: "IMG/ensino/apostilaEnem.png" },
    {id: 15, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", ano: 1943, genero: "Clássicos", capa: "IMG/classicos/pequeno-principe.jpeg" },
    {id: 16, titulo: "O Ladrão de Raios", autor: "Rick Riordan", ano: 2005, genero: "Fantasia", capa: "IMG/fantasia/ladrao-de-raios.jpeg" }
];

const BIBLIOTECAS_USUARIOS = {
    "perfil1": [
        { idLivro: 1, formato: "" },
        { idLivro: 16, formato: "" },
        { idLivro: 9, formato: "" },
        { idLivro: 11, formato: "KINDLE" },
        { idLivro: 12, formato: "GOOGLE LIVROS" },
        { idLivro: 5, formato: "GOOGLE LIVROS" },
        { idLivro: 3, formato: "KINDLE" },
        { idLivro: 8, formato: "PDF" },
        { idLivro: 10, formato: "PDF" },
        { idLivro: 7, formato: "PDF" }
    ]
};