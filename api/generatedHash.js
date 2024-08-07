import bcrypt from 'bcryptjs';

const password = '12345';

const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Erro ao gerar hash:', err);
    return;
  }
  console.log('Hash gerado para a senha:', hash);
});
