import { NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';

// GET all students
export async function GET(request: Request) {
  try {
    const isAuthorized = await verifyAdminRequest(request);

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing admin credentials', success: false },
        { status: 401 }
      );
    }

    await initDb();
    const sql = getDb();
    const students = await sql`
      SELECT * FROM students ORDER BY created_at DESC;
    `;

    return NextResponse.json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error: unknown) {
    console.error('Error fetching students:', error);
    const errObj = error as { message?: string };
    return NextResponse.json(
      { error: errObj.message || 'Internal Server Error', success: false },
      { status: 500 }
    );
  }
}

// POST create new student
export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAdminRequest(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    await initDb();
    const body = await request.json().catch(() => ({}));
    const { name, email, phone, batch_name, total_fee, paid_amount } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone number are required', success: false },
        { status: 400 }
      );
    }

    const feeX = Number(total_fee) || 10000;
    const paidY = Number(paid_amount) || 0;
    const pendingAmount = Math.max(0, feeX - paidY);

    let status = 'Pending';
    if (paidY >= feeX) {
      status = 'Completed';
    } else if (paidY > 0) {
      status = 'Partial';
    }

    const sql = getDb();
    const result = await sql`
      INSERT INTO students (name, email, phone, batch_name, total_fee, paid_amount, pending_amount, status)
      VALUES (
        ${name},
        ${email},
        ${phone},
        ${batch_name || 'Batch A'},
        ${feeX},
        ${paidY},
        ${pendingAmount},
        ${status}
      )
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      message: 'Student added successfully',
      student: result[0],
    });
  } catch (error: unknown) {
    console.error('Error adding student:', error);
    const errObj = error as { message?: string };
    return NextResponse.json(
      { error: errObj.message || 'Failed to add student', success: false },
      { status: 500 }
    );
  }
}

// PUT update student payment / batch fee
export async function PUT(request: Request) {
  try {
    const isAuthorized = await verifyAdminRequest(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    await initDb();
    const body = await request.json().catch(() => ({}));
    const { id, additional_payment, total_fee, batch_name } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Student ID is required', success: false },
        { status: 400 }
      );
    }

    const sql = getDb();
    const existing = await sql`SELECT * FROM students WHERE id = ${id} LIMIT 1;`;
    if (!existing || existing.length === 0) {
      return NextResponse.json(
        { error: 'Student record not found', success: false },
        { status: 404 }
      );
    }

    const currentStudent = existing[0];
    const newTotalFee = total_fee !== undefined ? Number(total_fee) : Number(currentStudent.total_fee);
    const addPay = Number(additional_payment) || 0;
    const newPaidAmount = Number(currentStudent.paid_amount) + addPay;
    const newPendingAmount = Math.max(0, newTotalFee - newPaidAmount);

    let newStatus = 'Pending';
    if (newPaidAmount >= newTotalFee) {
      newStatus = 'Completed';
    } else if (newPaidAmount > 0) {
      newStatus = 'Partial';
    }

    const updated = await sql`
      UPDATE students
      SET total_fee = ${newTotalFee},
          paid_amount = ${newPaidAmount},
          pending_amount = ${newPendingAmount},
          status = ${newStatus},
          batch_name = COALESCE(${batch_name || null}, batch_name)
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      message: 'Student record updated successfully',
      student: updated[0],
    });
  } catch (error: unknown) {
    console.error('Error updating student payment:', error);
    const errObj = error as { message?: string };
    return NextResponse.json(
      { error: errObj.message || 'Failed to update student payment', success: false },
      { status: 500 }
    );
  }
}
