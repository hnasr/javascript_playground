import pylibmc
import unittest

class PylibmcTest(unittest.TestCase):
    def setUp(self):
        self.servers = (
            '0.0.0.1:11211',
            '0.0.0.2:11211',
            '0.0.0.3',
            '0.0.0.4:11213',
            '0.0.0.5:11212',
        )
        self.mc = pylibmc.Client(self.servers, behaviors={"ketama_weighted": True})

    def test_points(self):
        for i in xrange(0, 100000):
            server_index = self.mc.hash(str(i))
            print i, self.servers[server_index]

if __name__ == "__main__":
  unittest.main()
