using Org.BouncyCastle.Crypto.Generators;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
namespace TestHash
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            // Kiểm tra textBox1 có rỗng không
            if (string.IsNullOrWhiteSpace(textBox1.Text))
            {
                MessageBox.Show("Vui lòng nhập mật khẩu!", "Thông báo",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            try
            {
                // Lấy password từ textBox1
                string password = textBox1.Text;

                // Tạo BCrypt hash sử dụng BouncyCastle
                byte[] passwordBytes = Org.BouncyCastle.Crypto.Generators.BCrypt.PasswordToByteArray(password.ToCharArray());
                // Tạo salt ngẫu nhiên (16 bytes)
                byte[] salt = new byte[16];
                using (var rng = new RNGCryptoServiceProvider())
                {
                    rng.GetBytes(salt);
                }
                // Cost factor (ví dụ: 10)
                int cost = 10;
                byte[] hashBytes = Org.BouncyCastle.Crypto.Generators.BCrypt.Generate(passwordBytes, salt, cost);

                // Kết hợp salt và hash thành một chuỗi base64 để lưu trữ
                string bcryptHash = Convert.ToBase64String(salt) + "$" + Convert.ToBase64String(hashBytes);

                // Hiển thị kết quả vào textBox2
                textBox2.Text = bcryptHash;

                // Thông báo thành công
                MessageBox.Show("Hash mật khẩu thành công!", "Thành công",
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Lỗi: {ex.Message}", "Lỗi",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            // Có thể thêm logic khi textBox1 thay đổi (nếu cần)
        }

        private void textBox2_TextChanged(object sender, EventArgs e)
        {
            // Có thể thêm logic khi textBox2 thay đổi (nếu cần)
        }

        // ===== HOẶC NẾU BẠN MUỐN DÙNG SHA-256 =====
        private void button1_Click_SHA256(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(textBox1.Text))
            {
                MessageBox.Show("Vui lòng nhập mật khẩu!", "Thông báo",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            try
            {
                string password = textBox1.Text;

                // Tạo SHA-256 hash
                using (SHA256 sha256 = SHA256.Create())
                {
                    byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                    StringBuilder builder = new StringBuilder();
                    foreach (byte b in bytes)
                    {
                        builder.Append(b.ToString("X2"));
                    }

                    // Hiển thị kết quả vào textBox2
                    textBox2.Text = builder.ToString();
                }

                MessageBox.Show("Hash mật khẩu thành công!", "Thành công",
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Lỗi: {ex.Message}", "Lỗi",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
