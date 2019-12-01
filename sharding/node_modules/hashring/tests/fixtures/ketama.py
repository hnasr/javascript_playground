import ketama
import unittest
import os

class KetamaTest(unittest.TestCase):
  def setUp(self):
    self.server_list_file = os.tmpnam()
    self.server_list = file(self.server_list_file, "w")
    self.server_list.write("0.0.0.1\t1\n")
    self.server_list.write("0.0.0.2\t2\n")
    self.server_list.write("0.0.0.3\t3\n")
    self.server_list.write("0.0.0.4\t4\n")
    self.server_list.write("0.0.0.5\t5\n")
    self.server_list.flush()

  def tearDown(self):
    self.server_list.close()
    os.unlink(self.server_list_file)

  def test_points(self):
    ring = ketama.Continuum(self.server_list_file)

    for i in xrange(0, 100000):
      print i, ring.get_server(str(i))[1]

if __name__ == "__main__":
  unittest.main()
