// scripts/purgarSesionesAntiguas.ts
import prisma from '../src/Lectura-Progreso/infraestructure/prisma/client';

async function purgarSesiones() {
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - 30);

  // 1️⃣ Agrupar por usuario y libro
  const resumen = await prisma.sesionLectura.groupBy({
    by: ['idUsuario', 'idLibro'],
    where: { fechaInicio: { lt: fechaLimite } },
    _sum: {
      paginasLeidas: true,
      duracionMinutos: true
    }
  });

  // 2️⃣ Insertar resumen en tabla
  await prisma.resumenLectura.createMany({
    data: resumen.map(r => ({
      idUsuario: r.idUsuario,
      idLibro: r.idLibro,
      paginasTotales: r._sum.paginasLeidas ?? 0,
      minutosTotales: r._sum.duracionMinutos ?? 0,
    })),
    skipDuplicates: true
  });

  // 3️⃣ Borrar sesiones antiguas
  const eliminadas = await prisma.sesionLectura.deleteMany({
    where: { fechaInicio: { lt: fechaLimite } }
  });

  console.log(`📌 Resumen guardado de ${resumen.length} combinaciones usuario-libro`);
  console.log(`✅ ${eliminadas.count} sesiones eliminadas (anteriores a ${fechaLimite.toISOString()})`);
}

purgarSesiones()
  .catch(console.error)
  .finally(() => process.exit());
